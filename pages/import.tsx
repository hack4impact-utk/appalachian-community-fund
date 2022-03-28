/* eslint-disable func-style */
// https://github.com/exceljs/exceljs
import React from 'react';
import ImportTool from '../components/ImportTool';
import Head from 'next/Head';
import styles from '../styles/Home.module.scss';


const importPage: React.FC = () => {
    return (
        <div className={styles.Container}>
            <Head>
                <title>Import</title>
            </Head>
            <main className={styles.main}>
                <h1>Import Tool</h1>
                <ImportTool></ImportTool>
            </main>
        </div>
    );
};

export default importPage;

