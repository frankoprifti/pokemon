const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const searchPokemon = async (pokemonName) => {
    try {
        const pokemon = await prisma.pokemon.findMany({
            where: {
                name: {
                    contains: pokemonName.toLowerCase(),
                },
            },
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

        if (pokemon.length > 0) {
            return pokemon
        } else
            return []
    }
    catch (error) {
        return []
    } finally {
        await prisma.$disconnect();
    }
};
