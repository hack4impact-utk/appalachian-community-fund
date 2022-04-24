import React, { useState, useContext } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import { GetAuth } from '../../../lib/auth';
import { AdminFilesAddData, defaultAdminFilesAddData } from '../../../utils/adminInterfaces';
import styles from '../../../styles/Admin.module.scss';
import { WP_Post } from '../../../utils/wordpressInterfaces';

//Good source: https://www.edmundcwm.com/uploading-media-using-the-wp-rest-api-and-javascript/
// https://rudrastyh.com/wordpress/rest-api-create-delete-posts.html
// https://michaelsoriano.com/create-a-file-uploader-with-react-and-wordpress-rest-api-media/

const AdminFilesAdd: React.FunctionComponent = () => {

    const [newFileData, setNewFileData] = useState<AdminFilesAddData>(defaultAdminFilesAddData);

    const handleUpload = async (e) => {

        console.log(newFileData);

        const postPayload = {
              //'date': newFileData.articleDate.toDateString(),
            //date_gmt: newFileData.articleDate,
              //'slug': `${new Date}${newFileData.fileName}`,
            'status': 'publish',
            //password: '',
            'title': newFileData.fileName,
            'content': `File ${newFileData.fileName} hosted here`, //NOTE: This may need to be an object
            //author: '0', //TODO: Swap this out with the current logged in user's ID
              //'excerpt': `File ${newFileData.fileName}`,
            //featured_media: '',
              //'comment_status': 'closed',
            //ping_status: 'close', //TODO: Find what this is for and set it correctly
              //'format': 'image',
            // meta: '',
            // sticky: '',
            // template: '',
            // categories: [],
            // tags: []
        };
        const authInfo = GetAuth(); //TODO: Swap this out with the current logged in user's info

        console.log(postPayload);
        console.log(authInfo);

        //First we should just create a new post with our meta data that links it to a file
        try {
            const associatedPost: WP_Post = (await axios.post<string, any>('/wpapi/?rest_route=/wp/v2/posts', JSON.stringify(postPayload), { 
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': authInfo
                }
            })).data;

            // const associatedPost = await fetch('/wpapi/?rest_route=/wp/v2/posts', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'accept': 'application/json',
            //         'Authorization': authInfo
            //     },
            //     body: JSON.stringify(postPayload)
            // });
    
            console.log(associatedPost);

            //Now we post the media item
            try {
                const formData = new FormData();
                formData.append('file', newFileData.file);
        
                //We can append the arguments listed in the wordpress rest api here
                formData.append('title', newFileData.fileName);
                formData.append('description', newFileData.fileName);
                formData.append('status', 'publish');
                formData.append('post', associatedPost.id.toString());

                const mediaItem = (await axios.post(`/wpapi/?rest_route=/wp/v2/media`, formData, {
                    headers: {
                        'Content-Disposition': `form-data; filename='${newFileData.fileName}'`,
                        'Authorization': authInfo
                    }
                }));
                console.log(mediaItem);
            }
            catch (ex) {
                console.log(ex);
            }
        }
        catch (ex) {
            console.log(ex);
        }
    }

    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>
                <input 
                    className={styles.file_input}
                    type="file"
                    onChange={(e) => setNewFileData({ ...newFileData, file: e.target.files[0] })}
                />
                <h4>Required</h4>
                <input 
                    className={styles.file_input}
                    type="text"
                    placeholder='File Name'
                    onChange={e => setNewFileData({ ...newFileData, fileName: e.target.value })}
                />
                <input 
                    className={styles.file_input}
                    type="text"
                    placeholder='Author'
                    onChange={e => setNewFileData({ ...newFileData, author: e.target.value })}
                />
                <h6>Put Categories here</h6>
                <h6>Put Tags here</h6>
                <h4>Optional</h4>
                <input 
                    className={styles.file_input}
                    type="date"
                    placeholder='Date of Article'
                    onChange={e => setNewFileData({ ...newFileData, articleDate: new Date(e.target.value)})}
                />

                <input 
                    className={styles.file_input}
                    type="button"
                    value="Submit"
                    onClick={handleUpload}
                />
                
            </div>
        </React.Fragment>
    );
}

export default AdminFilesAdd;