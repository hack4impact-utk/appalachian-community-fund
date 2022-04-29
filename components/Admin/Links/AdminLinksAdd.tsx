import React, { useState, useContext } from 'react';
import axios from 'axios';
import CategoryDropdownAdmin from '../Shared/CategoryDropdown';
import TagDropdownAdmin from '../Shared/TagsDropdown';
import { AdminLinkAddData, defaultAdminLinkAddData } from '../../../utils/adminInterfaces';
import { AdminLinksContext, LinkPages } from './AdminLinksMain';
import { categoryStruct, tagStruct } from '../../../utils/interfaces';
import { GetAuth } from '../../../lib/auth';
import { WP_Post } from '../../../utils/wordpressInterfaces';
import styles from '../../../styles/Admin.module.scss';

const AdminLinksAdd: React.FunctionComponent = () => {

    const [linkData, setLinkData] = useState<AdminLinkAddData>(defaultAdminLinkAddData);
    const [selectedCategories, setSelectedCategories] = useState<categoryStruct[]>([]);
    const [selectedTags, setSelectedTags] = useState<tagStruct[]>([]);
    const context = useContext(AdminLinksContext);

    const handleUpload = async () => {

        //TODO: Error check to make sure the link submitted is a valid link

        const categoriesIDs: number[] = selectedCategories.map(x => x.id);
        const tagsIDs: number[] = selectedTags.map(x => x.id);

        const postPayload = {
            'status': 'publish',
            'title': linkData.title,
            'content': `Links to external site ${linkData.url}\nLINK@${linkData.url}`, //NOTE: The search item component looks for LINK@ to know what URL to link to
            'excerpt': linkData.description,
            'format': 'link',
            'categories': categoriesIDs.join(),
            'tags': tagsIDs.join()
        };

        console.log(postPayload);

        try {
            const associatedPost: WP_Post = (await axios.post<string, any>('/wpapi/?rest_route=/wp/v2/posts', JSON.stringify(postPayload), { 
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': GetAuth()
                }
            })).data;

            console.log(associatedPost);
            setLinkData(defaultAdminLinkAddData);
        }
        catch (ex) {
            console.log(ex);
        }
    }

    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>
                <h4>URL</h4>
                <input 
                    className={styles.file_input}
                    type="text"
                    placeholder='URL'
                    value={linkData.url}
                    onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                />

                <h4>Title</h4>
                <input 
                    className={styles.file_input}
                    type="text"
                    placeholder='Title'
                    value={linkData.title}
                    onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
                />

                <h4>Description</h4>
                <input 
                    className={styles.file_input}
                    type="text"
                    placeholder='Description'
                    value={linkData.description}
                    onChange={(e) => setLinkData({ ...linkData, description: e.target.value })}
                />

                <CategoryDropdownAdmin 
                    {...{ selectedCategories, setSelectedCategories }}
                />

                <TagDropdownAdmin 
                    {...{ selectedTags, setSelectedTags }}
                />

                <input 
                    className={styles.file_input}
                    type="button"
                    value="Submit"
                    onClick={handleUpload}
                />

                <button className={styles.main_button} onClick={() => context.setLinkPage(LinkPages.LinkMain)}>Go Back</button>
            </div>
        </React.Fragment>
    );
}

export default AdminLinksAdd;