import React, { useState } from "react";
import SearchIcon from "../images/search.svg";

export const SearchBarPresentation = (props) => {
  return (
    <section className="navbar__search" aria-labelledby="search-label">
      <form action="/search" method="GET" className="navbar__input-group">
        <label for="search-input" id="search-label" className="sr-only">
          Search
        </label>
        <input
          type="search"
          className="navbar__search-input"
          id="search-input"
          placeholder="Search"
          name="q"
          value={props.query}
          onChange={(e) => {
            props.setQuery(e.target.value);
          }}
        />
        <button
          aria-label="Submit"
          type="submit"
          className="navbar__button search"
          style={{ color: "white" }}
        >
          <span className="sr-only">Search</span>
          <img src={SearchIcon} style={{ color:"white", height:"1rem", width:"1rem", maxWidth:"initial" }} />
        </button>
      </form>
    </section>
  );
};

export const SearchBar = ({
  handleSubmitToggle,
  setResults,
  setHandleSubmitToggle,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleSubmitToggle === 0) {
      setHandleSubmitToggle(1);
    } else {
      setHandleSubmitToggle(0);
    }
  };

  return (
    <SearchBarPresentation
      handleSubmit={handleSubmit}
      query={query}
      setQuery={setQuery}
    />
  );
};
