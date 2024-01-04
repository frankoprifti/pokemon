import React, { useEffect, useState } from "react";
import { Pokemon } from "../entities/Pokemon";
import styles from "./PokemonCard.module.scss";
import extra from "../helpers/pokemonColors.json";
import Image from "next/image";

const PokemonCard: React.FC<{
  pokemon: Pokemon;
  sortStat: string;
  isOpenId: number | null;
  setIsOpenId: React.Dispatch<React.SetStateAction<number>>;
}> = ({ pokemon, sortStat, isOpenId, setIsOpenId }) => {
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
        const calcOffset = hoverEl?.clientWidth / 2;
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
  const animateCard = () => {
    const cardItself = document.getElementById(`pokemon-card-${pokemon.id}`);
    const cardWidth = cardItself.offsetWidth;
    const cardHeight = cardItself.offsetHeight;
    const { left, top } = cardItself.getBoundingClientRect();
    const { clientWidth, clientHeight } = document.documentElement;
    const leftOffset = clientWidth / 2 - left - cardWidth / 2;
    const topOffset = clientHeight / 2 - top - cardHeight / 2;
    cardItself.style.translate = `${leftOffset}px ${topOffset}px`;
    cardItself.style.scale = `1.3`;
  };
  const animateReverseCard = () => {
    const cardItself = document.getElementById(`pokemon-card-${isOpenId}`);
    if (cardItself) {
      cardItself.style.translate = `0px 0px`;
      cardItself.style.scale = `1`;
    }
  };
  return (
    <div
      id={`pokemon-card-${pokemon.id}`}
      className={`${styles.pokemonCard} ${
        isOpenId === pokemon.id && styles.isOpen
      }`}
      style={{ borderColor: primaryColor }}
      onMouseEnter={() => setActiveId(pokemon.id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenId(isOpenId === pokemon.id ? null : pokemon.id);
        if (isOpenId !== pokemon.id) {
          animateCard();
          if (isOpenId) {
            animateReverseCard();
          }
        } else {
          animateReverseCard();
        }
      }}
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
      <Image
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
        {pokemon.stats.map((stat, i) => {
          return (
            <div
              key={stat.stat.name + i}
              className={`${styles.stat} ${
                sortStat === stat.stat.name && styles.highlightedStat
              }`}
              style={{
                background:
                  sortStat === stat.stat.name &&
                  `radial-gradient(circle, ${primaryColor}, transparent)`,
              }}
            >
              <b>{stat.base_stat}</b>
              <div>{stat.stat.name.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
      <b>Type</b>
      <div className={styles.types}>
        {pokemon.types.map(({ type }, i) => {
          return (
            <div key={type.name + i} className={styles.type}>
              {extra[type.name].emoji}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
