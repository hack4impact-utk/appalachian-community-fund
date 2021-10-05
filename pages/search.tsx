/* eslint-disable func-style */
import React, { useState } from 'react';
import Head from 'next/Head'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Search: React.FC = () => {
    // React hook UseState
    const[ append, setAppend ] = useState('');

    // Dynamically Route to new page on user search
    const router = useRouter();
    const getSearch = () => {
        router.push(`search/${append}`);
    };

    return (
        <div className={styles.Container}>
            <Head>
                <title>Search</title>
            </Head>
            <main className={styles.main}>
                <h1>Search Page</h1>
                <form>
                    <label>
                        Search
                        <input
                            type="text"
                            onChange={(word) => {
                                // useState's `setAppend` assigns to value to `append`
                                // NOTE: takes you to 404 page since there is no search data
                                return setAppend(word.target.value);
                            }}
                        />
                    </label>
                    <button onClick={getSearch}>Submit</button>
                </form>
            </main>
        </div>
    );
};

export default Search;
