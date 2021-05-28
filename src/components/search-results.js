import React from "react";
import { navigate } from "gatsby";

const SearchResults = ({ results, setResults, expandCallback }) => {
    const handleClick = (e, slug) => {
        e.preventDefault();
        navigate(`${slug}`);
        setResults([]);
        expandCallback(slug);
    };

    return (
        <div className="search-results">
            {results.length === 0 ? (
                <div className="search-results__item">
                    <p>0 Results</p>
                </div>
            ) : (
                results.map(result => {
                    return (
                        <div className="search-results__item">
                            <a href="#" onClick={(e) => handleClick(e, result.slug)}>
                                <h3>{result.title}</h3>
                            </a>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: `${result.excerpt.slice(0,60)}...`,
                                }}
                            />
                        </div>
                    )
                })
            )}
        </div>
    );
}

export default SearchResults;