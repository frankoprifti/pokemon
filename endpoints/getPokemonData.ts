import axios from "axios";
import { Pokemon } from "../entities/Pokemon";

export const getPokemonData = async (baseUrl: string, offset: number): Promise<Pokemon[]> => {
    try {
        const response = await axios.post<Pokemon[]>(`${baseUrl}/api/api`, {
            offset,
        });
        return response.data;
    } catch (error) {
        return []
    }
}