import React from 'react';
import Head from 'next/Head'
import styles from '../styles/Home.module.scss';

const About: React.FC = () => {
    return (    
        <div className={styles.Container}>
            <Head>
                <title>About</title>
            </Head>

            <main className={styles.main}>
                <h1>About Page</h1>
            </main>
        </div>
    );
};

export default About;
