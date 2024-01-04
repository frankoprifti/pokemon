import axios from "axios";
import { Pokemon } from "../entities/Pokemon";

export const getPokemonData = async (baseUrl: string, page: number): Promise<Pokemon[]> => {
    try {
        const response = await axios.post<Pokemon[]>(`${baseUrl}/api/api`, {
            page,
        });
        return response.data;
    } catch (error) {
        return []
    }
}