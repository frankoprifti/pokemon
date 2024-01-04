import React, { useEffect, useState } from "react";
import { Pokemon } from "../entities/Pokemon";
import styles from "./PokemonCard.module.scss";
import extra from "../helpers/pokemonColors.json";

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const primaryType = pokemon.types[0].type.name;
  const primaryColor = extra[primaryType].color;
  const secondaryColor = extra[primaryType].secondaryColor;

  useEffect(() => {
    if (activeId) {
      const cardItself = document.getElementById(`pokemon-card-${pokemon.id}`);
      const { left, top } = cardItself.getBoundingClientRect();
      document.addEventListener("mousemove", function (e) {
        const hoverEl = document.getElementById(`hover-effect-${activeId}`);
        const calcOffset = hoverEl.clientWidth / 2;
        if (hoverEl) {
          hoverEl.style.left = e.pageX - left - calcOffset + "px";
          hoverEl.style.top =
            e.pageY - top - window.scrollY - calcOffset + "px";
        }
      });
    } else {
      document.removeEventListener("mousemove", null);
    }
    return () => {
      document.removeEventListener("mousemove", null);
    };
  }, [activeId]);

  return (
    <div
      id={`pokemon-card-${pokemon.id}`}
      className={styles.pokemonCard}
      style={{ borderColor: primaryColor }}
      onMouseEnter={() => setActiveId(pokemon.id)}
      onMouseLeave={() => setActiveId(null)}
    >
      <div
        className={styles.backgroundColor}
        style={{ background: primaryColor }}
      />
      <div
        id={`hover-effect-${pokemon.id}`}
        className={styles.hoverEffect}
        style={{
          background: `radial-gradient(circle, ${primaryColor}, transparent, transparent)`,
        }}
      />
      <img
        alt={pokemon.name}
        className={styles.pokemonImg}
        src={`/sprites/${pokemon.id}.svg`}
      />
      <h1>{pokemon.name}</h1>
      <hr
        className={styles.separator}
        style={{
          background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
        }}
      />
      <div className={styles.statistics}>
        {pokemon.stats.map((stat) => {
          return (
            <div className={styles.stat}>
              <b>{stat.base_stat}</b>
              <div>{stat.stat.name.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
      <b>Type</b>
      <div className={styles.types}>
        {pokemon.types.map(({ type }) => {
          return <div className={styles.type}>{extra[type.name].emoji}</div>;
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
