import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonData } from "../endpoints/getPokemonData";
import { Pokemon } from "../entities/Pokemon";
import styles from "./Home.module.scss";
import Head from "next/head";

export async function getServerSideProps({ req }) {
  const originUrl = req ? `http://${req?.headers?.host}` : "";
  const data = await getPokemonData(originUrl, 1);
  if (data.length === 0) {
    return { notFound: true };
  }
  return { props: { data } };
}

const Home: React.FC = ({ data }: { data: Pokemon[] }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>(data);
  const [page, setPage] = useState<number>(1);
  const pokeballSVG =
    "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg";

  useEffect(() => {
    const getData = async () => {
      const data = await getPokemonData(window.location.origin, page);
      console.log(data, "DATAAAAA");
      setPokemonData(data);
    };
    getData();
  }, [page]);

  return (
    <div className={styles.home}>
      <Head>
        <title>Pokémon</title>
        <link rel="icon" type="image/x-icon" href={pokeballSVG}></link>
      </Head>
      <div className={styles.header}>
        <h1>
          P
          <img className={styles.pokeball} src={pokeballSVG} alt="pokeball" />
          kémon
        </h1>
        <div className={styles.pagination}>
          <div
            aria-disabled={page === 1}
            onClick={() => {
              page > 1 && setPage(page - 1);
            }}
          >
            {"<"}
          </div>
          <div onClick={() => setPage(page + 1)}>{">"}</div>
        </div>
      </div>
      <div className={styles.pokemonCards}>
        {pokemonData.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
