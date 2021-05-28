import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ localSearchPages, setResults }) => {
    const [query, setQuery] = useState('');

    const results = useFlexSearch(
        query,
        localSearchPages.index,
        localSearchPages.store
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setResults(results.slice(0, 15));
    };

    return (
        <form  onSubmit={handleSubmit} className="navbar__input-group">
            <input
                type="search"
                className="navbar__search"
                placeholder="Search"
                value={query}
                onChange={e => {
                    if(e.target.value.length === 0) {
                        setResults([]);
                    }
                    setQuery(e.target.value);
                }}
            />
            <button type="submit" className="navbar__button search">
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBar;