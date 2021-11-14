import React from 'react';
import Head from 'next/Head'
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
    return (    
        <div className={styles.Container}>
            <Head>
                <title>Home</title>
            </Head>

            <main className={styles.main}>
                <h1>Landing Page</h1>
                <h2>Sub-Headline</h2>
            </main>
        </div>
    );
};

export default Home;