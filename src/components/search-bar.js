import React, { useEffect, useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import { FaSearch } from "react-icons/fa";

export const SearchBarPresentation = (props) => {
  return (
    <section className="navbar__search" aria-labelledby="search-label">
      <form onSubmit={props.handleSubmit} className="navbar__input-group">
        <label for="search-input" id="search-label" class="sr-only">
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
        >
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export const SearchBar = ({ index, store, setResults }) => {
  const [query, setQuery] = useState("");

  const results = useFlexSearch(query, index, store);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults(results.slice(0, 15));
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
