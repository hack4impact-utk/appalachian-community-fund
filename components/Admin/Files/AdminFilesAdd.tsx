import React, { useState, useContext } from 'react';
import { AdminFilesContext, FilePage } from './AdminFilesMain';
import { handleUpload as handleUploadHelper } from '../../../utils/fileUploadHelper';
import { Buffer } from 'buffer';
import axios from 'axios';
import { GetAuth } from '../../../lib/auth';
import { AdminFilesAddData, defaultAdminFilesAddData } from '../../../utils/adminInterfaces';
import styles from '../../../styles/Admin.module.scss';
import CategoryDropdownAdmin from '../Shared/CategoryDropdown';
import TagDropdownAdmin from '../Shared/TagsDropdown';
import { categoryStruct, tagStruct } from '../../../utils/interfaces';
import { WP_Post, WP_Media } from '../../../utils/wordpressInterfaces';

//Good source: https://www.edmundcwm.com/uploading-media-using-the-wp-rest-api-and-javascript/
// https://rudrastyh.com/wordpress/rest-api-create-delete-posts.html
// https://michaelsoriano.com/create-a-file-uploader-with-react-and-wordpress-rest-api-media/

const AdminFilesAdd: React.FunctionComponent = () => {

    const [newFileData, setNewFileData] = useState<AdminFilesAddData>(defaultAdminFilesAddData);
    const [selectedCategories, setSelectedCategories] = useState<categoryStruct[]>([]);
    const [selectedTags, setSelectedTags] = useState<tagStruct[]>([]);
    const context = useContext(AdminFilesContext);

    const handleUpload = async (e) => {

        console.log(newFileData);

        const categoriesIDs: number[] = selectedCategories.map(x => x.id);
        const tagsIDs: number[] = selectedTags.map(x => x.id);

        const postPayload = {
              //'date': newFileData.articleDate.toDateString(),
            //date_gmt: newFileData.articleDate,
              //'slug': `${new Date}${newFileData.fileName}`,
            'status': 'publish',
            //password: '',
            'title': newFileData.fileName,
            'content': ``,
            //author: '0', //TODO: Swap this out with the current logged in user's ID
            'excerpt': `File ${newFileData.fileName}`,
            //featured_media: '',
              //'comment_status': 'closed',
            //ping_status: 'close', //TODO: Find what this is for and set it correctly
            'format': 'image',
            // meta: '',
            // sticky: '',
            // template: '',
            'categories': categoriesIDs.join(),
            'tags': tagsIDs.join()
        };
        const authInfo = GetAuth(); //TODO: Swap this out with the current logged in user's info

        //Now we post the media item
        const mediaItem = await handleUploadHelper(newFileData);

        //Create a new post with our meta data that links it to a file
        try {
            postPayload.content = `File ${newFileData.fileName} hosted here.\nLINK@${mediaItem.source_url}`
            const associatedPost: WP_Post = (await axios.post<string, any>('/wpapi/?rest_route=/wp/v2/posts', JSON.stringify(postPayload), { 
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': authInfo
                }
            })).data;
    
            console.log(associatedPost);
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
                <CategoryDropdownAdmin 
                    {...{ selectedCategories, setSelectedCategories }}
                />

                <TagDropdownAdmin 
                    {...{ selectedTags, setSelectedTags }}
                />
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

                <button className={styles.main_button} onClick={() => context.setFilePage(FilePage.FileMain)}>Go Back</button>
                
            </div>
        </React.Fragment>
    );
}

export default AdminFilesAdd;