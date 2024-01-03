import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);
    const offset = body.offset || 0;
    if (req.method === 'POST') {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=151`);
            const pokemonUrls = response.data.results.map((pokemon: { url: string }) => pokemon.url);
            const pokemonDetailsPromises = pokemonUrls.map((url: string) => axios.get(url));
            const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
            const pokemonDetails = pokemonDetailsResponses.map((pokemonResponse: { data: any }) => pokemonResponse.data);
            const finalData = pokemonDetails.map(({ id, name, stats, types }: any) => ({ id, name, stats, types }))
            res.status(200).json(finalData);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}