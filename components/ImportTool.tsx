/* eslint-disable func-style */
// https://github.com/exceljs/exceljs
import React from 'react';
import styles from '../styles/Home.module.css';
import ReactFileReader from 'react-file-reader';


const ImportTool: React.FC = () => {
    // Handle user given file 
    let handleFile = (files) => {
        // FileReader comes from HTML's built api
        let reader = new FileReader();
        reader.onload = function(e) {
            console.log(reader.result);
        };
        reader.readAsText(files[0]);
    };

    return (
        <div className={styles.Container}>
            {/* This component comes from a package that automatically handles files for us */}
            <ReactFileReader handleFiles={handleFile} fileTypes={'.csv'}>
                <button className='btn'>Upload File</button>
            </ReactFileReader>
        </div>
    );
};

export default ImportTool;

