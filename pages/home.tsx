import React from 'react';
import Head from 'next/Head'
import styles from '../styles/Home.module.css'

const Home: React.FC = () => {
    return (    
        <div className={styles.Container}>
            <Head>
                <title>Home</title>
            </Head>

            <main className={styles.main}>
                <h1>Landing Page</h1>
            </main>
        </div>
    );
}

export default Home;