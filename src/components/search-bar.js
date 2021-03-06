import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import SearchIcon from "../images/search.svg";

export const SearchBarPresentation = (props) => {
  return (
    <section className="navbar__search" aria-labelledby="search-label">
      <form onSubmit={props.handleSubmit} className="navbar__input-group">
        <label for="search-input" id="search-label" className="sr-only">
          Search
        </label>
        <input
          type="search"
          className="navbar__search-input"
          id="search-input"
          placeholder="Search"
          value={props.query}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              props.setResults([]);
            }
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
  index,
  store,
  handleSubmitToggle,
  setResults,
  setHandleSubmitToggle,
}) => {
  const [query, setQuery] = useState("");

  const results = useFlexSearch(query, index, store);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleSubmitToggle === 0) {
      setHandleSubmitToggle(1);
    } else {
      setHandleSubmitToggle(0);
    }
    setResults(results.slice(0, 25));
  };

  return (
    <SearchBarPresentation
      handleSubmit={handleSubmit}
      setResults={setResults}
      query={query}
      setQuery={setQuery}
    />
  );
};
