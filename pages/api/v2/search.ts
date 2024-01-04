import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { searchPokemon } from '../../../helpers/searchPokemon'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const name = req.body.name || '';
        const data = await searchPokemon(name)
        if (!data.error) {
            res.status(200).json(data)

        } else {
            res.status(404).json(data)
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}