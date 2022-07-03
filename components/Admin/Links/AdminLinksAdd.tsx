import React, { useState, useContext } from 'react';
import axios from 'axios';
import CategoryDropdownAdmin from '../Shared/CategoryDropdown';
import TagDropdownAdmin from '../Shared/TagsDropdown';
import { AdminLinkAddData, defaultAdminLinkAddData } from '../../../utils/adminInterfaces';
import { AdminLinksContext, LinkPages } from './AdminLinksMain';
import { categoryStruct, tagStruct } from '../../../utils/interfaces';
import { GetAuth } from '../../../lib/auth';
import { WP_Post } from '../../../utils/wordpressInterfaces';
import AdminTextBox from '../Shared/AdminTextbox';
import AdminButton from '../Shared/AdminButton';
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
            <div className={styles.admin_content}>
                <h1 className={styles.admin_header}>Add New Link Post</h1>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    
                    <div style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <h3 className={styles.admin_header}>Required</h3>
                        <AdminTextBox header='URL' value={linkData.url} setValue={(val: string) => setLinkData({ ...linkData, url: val })} />
                        <AdminTextBox header='Title' value={linkData.title} setValue={(val: string) => setLinkData({ ...linkData, title: val })} />
                        <AdminTextBox header='Description' value={linkData.description} setValue={(val: string) => setLinkData({ ...linkData, description: val })} />
                    </div>
                    <div style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <h3 className={styles.admin_header}>Optional</h3>
                        <CategoryDropdownAdmin 
                            {...{ selectedCategories, setSelectedCategories }}
                        />

                        <TagDropdownAdmin 
                            {...{ selectedTags, setSelectedTags }}
                        />
                    </div> 
                </div>
                
            </div>
            <AdminButton message='Submit' onClick={handleUpload} size='large' />
            <AdminButton message='Go Back' onClick={() => context.setLinkPage(LinkPages.LinkMain)} />
        </React.Fragment>
    );
}

export default AdminLinksAdd;