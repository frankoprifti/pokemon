import axios from "axios";
import { Pokemon } from "../entities/Pokemon";

export const searchPokemon = async (name: string,): Promise<Pokemon[]> => {
    const baseUrl = window.location.origin;
    try {
        const response = await axios.post<Pokemon[]>(`${baseUrl}/api/v2/search`, {
            name,
        });
        return response.data;
    } catch (error) {
        return []
    }
}