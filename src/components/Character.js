import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Character component that renders detailed information about each character every time that you click a character card on the homepage

function Character() {
  //Got the id from the url using the useParams hook
  let { id } = useParams();
  //Set up of a state variable to store the information about the character
  const [character, setCharacter] = useState(null);

  //UseEffect hook to fetch the information about the character and store it in the state variable setted up a few lines before. It has a dependency that every time the id changes, will execute this useEffect

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/" + id)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
      });
  }, [id]);

  if (!character) return null;
  return (
    //Render of the detailed information about the characters
    <div className="w-1/2  mx-auto py-20  text-white ">
      <div className="bg-slate-700 flex flex-col items-center pt-5 justify-center  rounded-lg">
        <img src={character.image} />
        <p className="font-extrabold text-2xl py-2">{character.name}</p>
        <p className="font-bold text-xl py-2">Status:</p>
        <p className="text-xl py-2">{character.status}</p>
        <p className="font-bold text-xl py-2">Species</p>
        <p className="text-xl py-2">{character.species}</p>
        <p className="font-bold text-xl py-2">Origin:</p>
        <p className=" text-xl py-2">{character.origin.name}</p>
        <p className="font-bold text-xl py-2">Gender:</p>
        <p className=" text-xl py-2">{character.gender}</p>
        <button className="my-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <a href="/">Volver</a>
        </button>
      </div>
    </div>
  );
}

export default Character;
