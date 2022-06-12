/* eslint-disable func-style */
// https://github.com/exceljs/exceljs
import React from 'react';
import styles from '../../../styles/Home.module.scss';
import ReactFileReader from 'react-file-reader';
import { WP_Post } from '../../../utils/wordpressInterfaces';
import { articleStruct } from '../../../utils/interfaces';
import Papa from 'papaparse';

interface IFileDataRaw {
    city: string,
    contactPersonName: string,
    description: string,
    email: string,
    image: string,
    logo: string,
    name: string,
    phoneNumber: string,
    physicalAddress: string,
    previewDescription: string,
    state: string,
    tags: string,
    website: string,
    zip: string,
    categories: string
}

const ImportTool: React.FC = () => {
    // Handle user given file
    let handleFile = (files) => {
        // Papa.parse uses HTML's built in FileReader. The results are gotten by a callback function
        Papa.parse(files[0], {
            skipEmptyLines: true,
            complete: function(result) {
                //NOTE: To put together the data, we are doing it based on column position rather than the header, that way if the headers ever get changed, it will still work
                // Keep in mind this comes with the drawback that you cannot move columns around, but I think that's less common then someone changing what a header says
                console.log(result);
                const completeData: articleStruct[] = [];

                //TODO: Check for errors in the result

                //This takes our raw data and gives it a datatype so it's easier to work with
                const baseFilter: any[] = result.data.slice(1, result.data.length-1).filter(x => x[0] != '');
                const baseTypedFilter: IFileDataRaw[] = baseFilter.map(x => ({
                    city: x[3],
                    contactPersonName: x[9],
                    description: x[6],
                    email: x[10],
                    image: x[1],
                    logo: x[12],
                    name: x[0],
                    phoneNumber: x[11],
                    physicalAddress: x[2],
                    previewDescription: x[7],
                    state: x[4],
                    tags: x[8],
                    website: x[14],
                    zip: x[5],
                    categories: x[13]
                }));
                console.log(baseTypedFilter);

                //Now we have
                baseFilter.forEach(x => {
                    let dataRow: any; //We don't use a datatype here since it will yell at us about all the missing fields
                    dataRow.title = x['Name'];
                    dataRow.content = ``;
                    //To do the tags and categories, we must get the ID's for each string hat was listed

                    //If there is a website listed, we need to post this as a seperate URL
                    if (x['Website '] !== '') {
                        dataRow.format = 'link';
                        dataRow.content += `\nLINK@${x['Website ']}`;
                    }
                });
            }
        });
    };

    return (
        <div className={styles.Container}>
            {/* This component comes from a package that automatically handles files for us */}
            <ReactFileReader handleFiles={handleFile} fileTypes={['.csv', '.xlsx']}>
                <button className='btn'>Upload File</button>
            </ReactFileReader>
        </div>
    );
};

export default ImportTool;

