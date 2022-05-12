import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GetAuth } from '../../../lib/auth';
import { AdminLinksContext, LinkPages } from './AdminLinksMain';
import { AdminLinkAddData, AdminSaveLinkData } from '../../../utils/adminInterfaces';
import { articleStruct } from '../../../utils/interfaces';
import styles from '../../../styles/Admin.module.scss';
import { DataGrid, GridCellEditCommitParams, GridEditCellPropsParams, GridRowId, MuiEvent } from '@mui/x-data-grid';

const ExistingLinksTable = () => {

    const context = useContext(AdminLinksContext);
    const [formattedPosts, setFormattedPosts] = useState<AdminLinkAddData[]>([]);
    const [baseArticles, setBaseArticles] = useState<articleStruct[]>([]);

    useEffect(() => {
        GetLinkPosts();
    }, []);

    const GetLinkPosts = async () => {
        const posts: articleStruct[] = (await axios.get(`/wpapi/?rest_route=/wp/v2/posts`)).data; 
        setBaseArticles(posts);
        //TODO: Make a custom api route that allows us to query posts with just the link format
        const filteredPosts: articleStruct[] = posts.filter(x => x.format === 'link');
        const formatPosts: AdminLinkAddData[] = [];
        
        filteredPosts.forEach(x => {
            const regex = /(?<=LINK@).+(?=<)/gm; //Looks for 'LINK@' in the content of the page to link to
            const descriptionRegex = /(?<=<p>).+(?=<\/p>)/gm; //Removes the <p> tags from the description
            formatPosts.push({
                url: regex.exec(x.content.rendered)[0],
                title: x.title.rendered,
                description: descriptionRegex.exec(x.excerpt.rendered)[0],
                id: x.id
            })
        });
        console.log(formatPosts);
        setFormattedPosts(formatPosts);
    }

    const handleCellEditCommit = (params: GridCellEditCommitParams, event: MuiEvent) => {
        const tempPosts = [...formattedPosts];
        const index = tempPosts.findIndex(x => x.id === params.id);
        tempPosts[index][params.field] = params.value; //This sets our editted field to the new value 

        //TODO: Make this save the change
        SaveEdittedPost(tempPosts[index]);

        setFormattedPosts(tempPosts);
    }

    const SaveEdittedPost = async (postData: AdminLinkAddData) => {
        //Save the data into an actual post object
        const saveObject: AdminSaveLinkData = {
            id: postData.id,
            excerpt: postData.description,
            title: postData.title,
            content: `Links to external site ${postData.url}\nLINK@${postData.url}`
        }

        try {
            const save = (await axios.post(`/wpapi/?rest_route=/wp/v2/posts/${postData.id}`, JSON.stringify(saveObject), {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': GetAuth()
                }
            }));
            console.log(save);
        } catch (ex) {
            console.warn(ex);
        }
    }

    return (
        <div style={{ height: 600, width: '90%' }}>
            <DataGrid 
                columns={[
                    { field: 'title', headerName: 'Title', width: 200, editable: true },
                    { field: 'url', headerName: 'URL', width: 800, editable: true },
                    { field: 'description', headerName: 'Description', width: 400, editable: true },
                    { field: 'id', headerName: 'Post ID' },
                ]}
                rows={formattedPosts}
                pageSize={5}
                rowsPerPageOptions={[5]}
                loading={formattedPosts.length === 0}
                onCellEditCommit={handleCellEditCommit}
            />
            <button className={styles.main_button} onClick={() => context.setLinkPage(LinkPages.LinkMain)}>Go Back</button>
        </div>
    );
}

export default ExistingLinksTable;