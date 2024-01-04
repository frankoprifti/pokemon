const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const readPokemonWithPagination = async (page = 1, pageSize = 20) => {
    try {
        const skip = (page - 1) * pageSize;

        const paginatedPokemon = await prisma.pokemon.findMany({
            skip,
            take: pageSize,
            include: {
                stats: {
                    include: {
                        stat: true,
                    },
                },
                types: {
                    include: {
                        type: true,
                    },
                },
            },
        });

        if (paginatedPokemon.length > 0) {
            return paginatedPokemon

        } else {
            return { error: `No Pokémon found.` }

        }
    } catch (error) {
        return { error: `Error reading Pokémon: ${error}` }
    } finally {
        await prisma.$disconnect();
    }
};
