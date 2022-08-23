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
import AdminTextBox from '../Shared/AdminTextbox';
import AdminButton from '../Shared/AdminButton';
import StateDropdown from '../Shared/StateDropdown';
import { SaveAddressAndState } from '../../../utils/dataHelper';
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

            await SaveAddressAndState(associatedPost.id, newFileData.address, newFileData.stateId);
        }
        catch (ex) {
            console.log(ex);
        }
    }

    return (
        <React.Fragment>
            <div className={styles.admin_content}>
                <h1 className={styles.admin_header}>Add New Link Post</h1>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <div style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <h3 className={styles.admin_header}>Required</h3>
                        <AdminTextBox
                            header='File Upload'
                            type='file'
                            setValue={(e) => { console.log(e); setNewFileData({ ...newFileData, file: e }); }}
                        />
                        <AdminTextBox header='File Name' value={newFileData.fileName} setValue={(e) => setNewFileData({ ...newFileData, fileName: e as string })} />
                    </div>
                    <div style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <h3 className={styles.admin_header}>Optional</h3>
                        <CategoryDropdownAdmin 
                            {...{ selectedCategories, setSelectedCategories }}
                        />
                        <TagDropdownAdmin 
                            {...{ selectedTags, setSelectedTags }}
                        />
                        <StateDropdown 
                            selectedState={newFileData.stateId}
                            setSelectedState={(val: number) => setNewFileData({ ...newFileData, stateId: val.toString() })}
                        />
                        <AdminTextBox header="Address" value={newFileData.address} setValue={(val: string) => setNewFileData({ ...newFileData, address: val })} /> {/* TODO: Replace this with an autocomplete */}
                        <AdminTextBox header='Author' value={newFileData.author} setValue={(e) => setNewFileData({ ...newFileData, author: e as string })} />
                        <AdminTextBox 
                            header='Date of Article' 
                            value={newFileData.articleDate?.toDateString() || ''} 
                            setValue={(e) => setNewFileData({ ...newFileData, articleDate: new Date(e as string) })} 
                            type='date' 
                        />
                    </div>

                </div>
            </div>
            <AdminButton message='Submit' size='large' onClick={() => handleUpload} />
            <AdminButton message='Go Back' onClick={() => context.setFilePage(FilePage.FileMain)} />
        </React.Fragment>
    );
}

export default AdminFilesAdd;