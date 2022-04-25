import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions";
/* import MaterialIcon from "react-google-material-icons"; */
/* import { FcSearch } from "react-icons/fc"; */

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name));
    setName("");
  }

  return (
    <span className="searchBar">
      <input
        className="input"
        type="text"
        value={name}
        placeholder="Recipes..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
        <span>search</span>
      </button>
    </span>
  );
}