/* eslint-disable func-style */
// https://github.com/exceljs/exceljs
import React from 'react';
import styles from '../styles/Home.module.css';
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse';


const ImportTool: React.FC = () => {
    // Handle user given file
    let handleFile = (files) => {
        // Papa.parse uses HTML's built in FileReader. The results are gotten by a callback function
        Papa.parse(files[0], {
            complete: function(result) {
                console.log(result);
            }
        });
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

