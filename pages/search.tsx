/* eslint-disable func-style */
import React, { useState } from 'react';
import Head from 'next/Head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import SearchFilter from '../components/SearchFilter';

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
                <SearchFilter></SearchFilter>
            </main>
        </div>
    );
};

export default Search;
