import React, { useEffect, useState } from "react";
import Filters from "../filters/filters.component";
import Header from "../header/header.component";
import Card from "../../helpers/pokecard/card.component";
import {
  fetchPokemonData,
  fetchPokemonTypes,
  fetchPokemonStats,
  fetchPokemonDesc,
  fetchPokemonEvolution,
} from "../../constants/api";
import "./home.style.css";
import InfoModal from "../modal/modal.component";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchField, setSearchField] = useState();
  const [typeField, setTypeField] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [infoModalPokemon, setInfoModalPokemon] = useState();
  const [descriptionAll, setDescriptionAll] = useState([]);
  const [description, setDescription] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [evolPokemons, setEvolPokemons] = useState([]);
  const [evolColor, setEvolColor] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleOpen = () => setOpenInfoModal(!openInfoModal);
  const handleClose = () => setOpenInfoModal(false);
  const toggleNav = () => setToggleMenu(!toggleMenu);

  useEffect(() => {
    async function getData() {
      const response = await fetchPokemonData();
      const { types, values } = await fetchPokemonTypes();
      const stats = await fetchPokemonStats();
      const desc = await fetchPokemonDesc();
      setDescriptionAll(desc);
      setStats(stats);
      setPokemons(response);
      setPokemonTypes(types);
      setTypes(values);
    }
    getData();
    getDesc();

    const changeWidth = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  const serachPokemon = (e) => {
    setSearchField(e.target.value);
    const filteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.includes(e.target.value);
    });
    setFilteredPokemons(filteredPokemons);

    if (e.target.value === "") {
      setFilteredPokemons([]);
      setSearchField("");
    }
  };

  const filterByType = (e) => {
    const val = e.target.labels[0].innerText.toLocaleLowerCase();
    let selectedTypes = [];
    if (!typeField.includes(val)) {
      selectedTypes = [...typeField, val];
    } else {
      selectedTypes = typeField.filter((tp) => tp !== val);
    }
    setTypeField(selectedTypes);

    const filtered = pokemons.filter((pk) => {
      const typesMatched = pk.types.filter((tp) => {
        return selectedTypes.includes(tp.type.name);
      });
      if (typesMatched.length === selectedTypes.length) {
        return pk;
      }
    });
    setFilteredPokemons(filtered);
    setSearchField();
  };

  const filterByStats = (values) => {
    let filtered = [];

    pokemons.forEach((pokemon) => {
      var pushed = false;
      values.forEach((funnel) => {
        if (!pushed) {
          const state = pokemon.stats.filter(
            (st) => st.stat.name === funnel.key
          );
          if (
            state.length &&
            state[0].base_stat > funnel.value[0] &&
            state[0].base_stat < funnel.value[1]
          ) {
            pushed = true;
            filtered.push(pokemon);
          }
        }
      });
    });

    const ids = filtered.map((o) => o.id);
    filtered = filtered.filter(({ id }, index) => !ids.includes(id, index + 1));

    setFilteredPokemons(filtered);
    setSearchField();
  };

  const resetStats = () => {
    setFilteredPokemons(pokemons);
    setSearchField();
  };

  const getDesc = () => {
    let newArr = [];
    descriptionAll.map((des) => {
      let filteredText = [];
      des.flavor_text_entries.map((text) => {
        if (text.language.name === "en") {
          const data = filteredText.filter((t) => {
            return t.includes(text.flavor_text);
          });
          if (!data.length) {
            filteredText.push(text.flavor_text);
          }
        }
      });
      newArr.push(filteredText);
    });
    setDescription(newArr);
  };

  const color = (pokemon) => {
    const pokemonKindList = pokemon?.types;
    const pokemonKindName1 = pokemonKindList[0]?.type?.name;
    const pokemonKindName2 = pokemonKindList[1]?.type?.name;

    const pokemonTypes = types.filter((type) => {
      const isTypeExist =
        type.hasOwnProperty(pokemonKindName1) ||
        type.hasOwnProperty(pokemonKindName2);
      return isTypeExist;
    });
    const color1 = pokemonTypes.find((color) => {
      return color[pokemonKindName1];
    });
    const color2 = pokemonTypes.find((color) => {
      return color[pokemonKindName2] || color[pokemonKindName1];
    });

    return !color2[pokemonKindName1]
      ? `${`linear-gradient(${color1[pokemonKindName1]}, ${color2[pokemonKindName2]})`}`
      : `${`linear-gradient(${color1[pokemonKindName1]}, ${color1[pokemonKindName1]})`}`;
  };

  const openModal = async (e, id) => {
    await getDesc();

    await setInfoModalPokemon(
      pokemons.find((pk) => {
        setCurrentId(pk.id);
        return id === pk.id;
      })
    );
    const pokemon = pokemons.find((pk) => id === pk.id);
    const { firstSpec, secondSec, thirdSpec } = await fetchPokemonEvolution(
      pokemon.id
    );
    const firstPokemon = pokemons.find((pk) => {
      return pk.name === firstSpec;
    });

    const secondPokemon = pokemons.find((pk) => {
      return pk.name === secondSec;
    });

    const thirdPokemon = pokemons.find((pk) => {
      return pk.name === thirdSpec;
    });
    const evol1 = color(firstPokemon);
    const evol2 = color(secondPokemon);
    const evol3 = color(thirdPokemon);

    setEvolColor([evol1, evol2, evol3]);
    setEvolPokemons([firstPokemon, secondPokemon, thirdPokemon]);

    handleOpen();
  };

  const prevPokemon = async (e) => {
    if (currentId === 1) {
      setInfoModalPokemon(pokemons[0]);
    } else {
      setCurrentId(currentId - 1);
      setInfoModalPokemon(pokemons[currentId - 1]);
    }
  };

  const nextPokemon = async (e) => {
    const lastItemIndex = pokemons.lastIndexOf(pokemons.slice(-1).pop());
    if (currentId === lastItemIndex) {
      setCurrentId(lastItemIndex);
      setInfoModalPokemon(pokemons[currentId]);
    } else {
      setCurrentId(currentId + 1);
      setInfoModalPokemon(pokemons[currentId]);
    }
  };

  return (
    <div>
      <div>
        <Header windowSize={windowSize}></Header>
      </div>
      <div>
        <Filters
          searchPokemon={serachPokemon}
          types={pokemonTypes}
          stats={stats}
          filterByType={filterByType}
          filterByStats={filterByStats}
          resetStats={resetStats}
          windowSize={windowSize}
          toggleNav={toggleNav}
        ></Filters>
      </div>
      <div className={windowSize > 600 ? "home" : "home-mobile"}>
        {filteredPokemons.length === 0 || searchField === ""
          ? pokemons.map((pokemon, key) => {
              return (
                <div
                  className={windowSize > 600 ? "cards" : "cards-mobile"}
                  key={key}
                >
                  <Card
                    openModal={openModal}
                    color={color(pokemon)}
                    img={`${pokemon.sprites.other.dream_world.front_default}`}
                    pokemon={pokemon.name}
                    index={pokemon.id}
                    windowSize={windowSize}
                  ></Card>
                </div>
              );
            })
          : filteredPokemons.map((pokemon, key) => {
              return (
                <div className="cards" key={key}>
                  <Card
                    openModal={openModal}
                    color={color(pokemon)}
                    img={`${pokemon.sprites.other.dream_world.front_default}`}
                    pokemon={pokemon.name}
                    index={pokemon.id}
                    windowSize={windowSize}
                  ></Card>
                </div>
              );
            })}

        <InfoModal
          description={description}
          handleClose={handleClose}
          open={openInfoModal}
          infoModalPokemon={infoModalPokemon}
          prevPokemon={prevPokemon}
          nextPokemon={nextPokemon}
          evolPokemons={evolPokemons}
          evolColor={evolColor}
          color={color}
          windowSize={windowSize}
        />
      </div>
    </div>
  );
};

export default Home;
