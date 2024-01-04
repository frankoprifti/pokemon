import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { readPokemonWithPagination } from '../../../helpers/readPokemonPagination'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const page = req.body.page || 1;
        const data = await readPokemonWithPagination(page)
        if (!data.error) {
            res.status(200).json(data)

        } else {
            res.status(404).json(data)
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}