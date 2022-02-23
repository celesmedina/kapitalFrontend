import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

//Home component that renders the app's main functionality: filters, search input and pagination

function Home() {
  //Set up of a state variable to store the information about the characters
  const [characters, setCharacters] = useState([]);

  //Set up of a state variable to implement the pagination

  const [page, setPage] = useState(0);
  //Set up of a state variable to save the number of pages with information

  const [pages, setPages] = useState(0);
  //Set up of a state variable to store input's value

  const [input, setInput] = useState("");

  //Handler function to set up the filter by name
  const handleOnClickButton = () => {
    setFiltros({
      ...filtros,
      name: input,
    });
  };
  //Set up of a state variable to store filter's values
  const [filtros, setFiltros] = useState({
    status: "",
    gender: "",
    name: "",
  });

  //Handler function to set up the filter by status

  const handleFilterStatus = (e) => {
    setFiltros({
      ...filtros,
      status: e.target.value,
    });
  };

  //Handler function to set up the filter by gender

  const handleFilterGender = (e) => {
    setFiltros({
      ...filtros,
      gender: e.target.value,
    });
  };

  //Using of useEffect hook to fetch the character's information using filters
  useEffect(() => {
    fetch(
      "https://rickandmortyapi.com/api/character/?page=" +
        page +
        "&status=" +
        filtros.status +
        "&gender=" +
        filtros.gender +
        "&name=" +
        filtros.name
    )
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setPages(data.info.pages);
      });
  }, [filtros, page]);

  //Handler function to set up the page number

  const handleOnClick = (e) => {
    setPage(Number(e.target.value));
  };
  //Handler function to go to the previous page when clicking

  const handleOnClickPrevious = () => {
    if (page - 1 > 0) {
      setPage(page - 1);
    }
  };
  //Handler function to go to the next page when clicking

  const handleOnClickNext = () => {
    if (page < pages) setPage(page + 1);
  };
  return (
    <div>
      <div className="text-center py-10">
        <select
          placeholder="Filter by Status"
          onChange={handleFilterStatus}
          className="rounded-md"
        >
          <option value=""> Status</option>
          <option value="alive"> Alive </option>
          <option value="dead"> Dead </option>
          <option value="unknown"> Unknown</option>
        </select>
        <select
          placeholder="Filter by Gender"
          onChange={handleFilterGender}
          className="rounded-md ml-10"
        >
          <option value=""> Gender</option>
          <option value="female"> Female </option>
          <option value="male"> Male </option>
          <option value="genderless"> Genderless</option>
        </select>

        <input
          placeholder="Type to search..."
          className="ml-10 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button
          className="mx-5 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleOnClickButton}
        >
          Search
        </button>
      </div>

      <div className="grid grid-rows-1 grid-cols-2 gap-7 px-40 mt-10">
        {/* Creating a card for every character found */}
        {!characters && (
          <h1 className="font-extrabold text-xl text-white">
            No characters found, search again
          </h1>
        )}
        {characters &&
          characters.map((character) => (
            <Card
              id={character.id}
              name={character.name}
              status={character.status}
              location={character.location.name}
              image={character.image}
              species={character.species}
              firstSeen={character.episode[0]}
            />
          ))}
      </div>

      <nav className="py-10">
        <ul className="flex justify-center">
          <li className="text-white  mx-4">
            <button
              onClick={handleOnClickPrevious}
              className="hover:font-extrabold"
            >
              Previous
            </button>
          </li>

          {Array.from(Array(pages).keys()).map((number) => (
            <li key={number} className="text-white mx-1">
              <button
                onClick={handleOnClick}
                value={number + 1}
                className="hover:font-extrabold"
              >
                {number + 1}
              </button>
            </li>
          ))}
          <li className="text-white text-center mx-4">
            <button
              onClick={handleOnClickNext}
              className="hover:font-extrabold"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
