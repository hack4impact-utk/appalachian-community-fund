import React, { useState, createContext } from 'react';
import axios from 'axios';
import Head from 'next/Head';
import styles from '../styles/Home.module.css';
import SearchFilter from '../components/SearchFilter';
import { searchFilterStruct, searchContextStruct } from '../utils/interfaces';

const SearchContext = createContext<searchContextStruct | null>(null);

const Search: React.FC = () => {

    const [currentSearchFilters, setCurrentSearchFilters] = useState<searchFilterStruct | null>(null);

    const UpdateCurrentFilters = async (newFilters: searchFilterStruct) => {
        setCurrentSearchFilters(newFilters);
        const data = await axios.get('/wpapi/?rest_route=/wp/v2/posts?per_page=1');
        console.log(data);
    }

    return (
        <SearchContext.Provider value={{currentSearchFilters, UpdateCurrentFilters}}>
            <div className={styles.Container}>
                <Head>
                    <title>Search</title>
                </Head>
                <main className={styles.main}>
                    <h1>Search Page</h1>
                    <SearchFilter />
                    <h1>Current Filters</h1>
                    {!currentSearchFilters ? <p>None</p> :
                        <div>
                            <p>Word: {currentSearchFilters.searchWordParam}</p>
                            <p>Tag: {currentSearchFilters.tagParam}</p>
                            <p>Category: {currentSearchFilters.regionParam}</p>
                        </div>
                    }
                </main>
            </div>
        </SearchContext.Provider>
    );
};

export { SearchContext };
export default Search;
