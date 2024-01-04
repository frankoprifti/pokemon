import React, { useEffect, useRef, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonData } from "../endpoints/getPokemonData";
import { searchPokemon } from "../endpoints/searchPokemon";
import { Pokemon } from "../entities/Pokemon";
import styles from "./Home.module.scss";
import Head from "next/head";

const pokeballSVG = "https://www.svgrepo.com/show/276264/pokeball-pokemon.svg";

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
  const [noData, setNoData] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedValue = useRef("");

  const getData = async () => {
    const data = await getPokemonData(window.location.origin, page);
    if (data.length > 0) {
      setNoData(false);
      setPokemonData(data);
    } else {
      setNoData(true);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const searchFunction = async (value) => {
    const data = await searchPokemon(value);
    if (data.length > 0) {
      setNoData(false);
      setPokemonData(data);
    } else {
      setNoData(true);
    }
  };
  useEffect(() => {
    const debounceSearch = () => {
      searchFunction(debouncedValue.current);
    };
    const debouncedEffect = setTimeout(() => {
      debounceSearch();
    }, 300);

    return () => {
      clearTimeout(debouncedEffect);
    };
  }, [debouncedValue.current]);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedValue.current = e.target.value;
  };
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
        <input
          className={styles.search}
          onChange={handleInputChange}
          placeholder="Search for a Pokemon"
          value={searchTerm}
        />
        <div className={styles.pagination}>
          {searchTerm ? (
            <div
              className={styles.clear}
              onClick={() => {
                setSearchTerm("");
                getData();
              }}
            >
              Clear
            </div>
          ) : (
            <>
              <div
                aria-disabled={page === 1}
                onClick={() => {
                  page > 1 && setPage(page - 1);
                }}
              >
                {"<"}
              </div>
              <div onClick={() => setPage(page + 1)}>{">"}</div>
            </>
          )}
        </div>
      </div>
      {!noData ? (
        <div className={styles.pokemonCards}>
          {pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <b>No results for "{searchTerm}"</b>
      )}
    </div>
  );
};

export default Home;
