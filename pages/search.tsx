/* eslint-disable func-style */
import React from 'react';
import Head from 'next/Head';
import styles from '../styles/Home.module.css';
import SearchFilter from '../components/SearchFilter';

const Search: React.FC = () => {
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
