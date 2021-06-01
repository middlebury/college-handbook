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
        <section className="navbar__search" aria-labelledby="search-label">
            <form onSubmit={handleSubmit} className="navbar__input-group">
                <label for="search-input" id="search-label" class="sr-only">Search</label>
                <input
                    type="search"
                    className="navbar__search-input"
                    id="search-input"
                    placeholder="Search"
                    value={query}
                    onChange={e => {
                        if(e.target.value.length === 0) {
                            setResults([]);
                        }
                        setQuery(e.target.value);
                    }}
                />
                <button aria-label='Submit' type="submit" className="navbar__button search">
                    <FaSearch />
                </button>
            </form>
        </section>
    )
}

export default SearchBar;