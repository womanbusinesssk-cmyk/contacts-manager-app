import { useContext } from "react";
import React  from "react";
import { contactcoutext } from "../../../../context/contactContext";

const Navar_search = () => {

    
    // const {query , contactSearch } = useContext(contactcoutext)
    const {  contactSearch } = useContext(contactcoutext)

  return (
    <div className="navar_serach_bar flex flex-row ">
      <div className="input-serach">
        <input
          className="bg--400 w-80 max-lg:w-60  pr-2 h-10 rounded-sm bg-zinc-500 hover:bg-zinc-400 hover:text-white  hover:bg-zinc-20 text-white"
          type="search"
          name="search"

          onChange={event => contactSearch(event.target.value)}
          id="search"
          placeholder="جست جوی مخاطب "
        />
      </div>
      <div className="btn-search w-10 max-lg:w-full h-10 rounded-md bg-red-500 flex items-center justify-center">
        <span className="fa-solid fa-magnifying-glass"></span>
      </div>
    </div>
  );
};

export default Navar_search
