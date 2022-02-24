import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/solid";

//Card component that renders basic information in the home page about the different characters , using cards
function Card({ id, name, status, location, image, species, firstSeen }) {
  // Set up of the state variable to retrieve the information about the first episode
  const [seen, setSeen] = useState("");

  //Set up of react dom hook to navigate from one page to another
  const navigate = useNavigate();

  //UseEffect hook to fetch the information about the first episode and store it in the state variable setted up a few lines before
  useEffect(() => {
    firstSeen &&
      fetch(firstSeen)
        .then((response) => response.json())
        .then((data) => setSeen(data.name));
  }, [firstSeen]);

  //Handler function to set up the path with the id to which navigate when clicking in the card
  const handleOnClick = (id) => {
    let path = "/characters/" + id;
    navigate(path);
  };
  return (
    //Render of the elements of the card with the information about the characters
    <div
      className="bg-slate-700 rounded-lg flex overflow-hidden my-5 mx-10 sm:m-0 "
      onClick={() => handleOnClick(id)}
    >
      <img src={image} className="h-52 w-52" />

      <div className="flex-col flex-1 text-white pl-4 pt-3  ">
        <p className="font-extrabold text-xl hover:text-blue-600"> {name}</p>
        <div className="flex items-center">
          {status === "Alive" ? (
            <div class="rounded-full h-3 w-3 bg-green-400  mr-2"></div>
          ) : status === "Dead" ? (
            <div class="rounded-full h-3 w-3 bg-red-600  mr-2"></div>
          ) : (
            <div class="rounded-full h-3 w-3 bg-neutral-300	  mr-2"></div>
          )}

          <p className="font-bold">
            {status} - {species}
          </p>
        </div>
        <p className="pt-3 text-slate-400 ">Last known location</p>
        <p className="text-lg hover:text-blue-600">{location}</p>
        <p className="pt-3 text-slate-400 ">First seen in:</p>
        <p className="text-lg hover:text-blue-600">{seen}</p>
      </div>
    </div>
  );
}

export default Card;
