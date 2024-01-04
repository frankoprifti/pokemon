import React from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonData } from "../endpoints/getPokemonData";
import { Pokemon } from "../entities/Pokemon";
import styles from "./Home.module.scss";
import Head from "next/head";

export async function getServerSideProps({ req }) {
  const originUrl = req ? `http://${req?.headers?.host}` : "";
  const data = await getPokemonData(originUrl, 0);
  if (data.length === 0) {
    return { notFound: true };
  }
  return { props: { data } };
}

const Home: React.FC = ({ data }: { data: Pokemon[] }) => {
  const pokeballSVG =
    "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg";
  return (
    <div className={styles.home}>
      <Head>
        <title>Pokémon</title>
        <link rel="icon" type="image/x-icon" href={pokeballSVG}></link>
      </Head>
      <h1>
        P
        <img className={styles.pokeball} src={pokeballSVG} alt="pokeball" />
        kémon
      </h1>
      <div className={styles.pokemonCards}>
        {data.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
