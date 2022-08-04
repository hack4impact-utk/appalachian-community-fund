import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import styles from '../../styles/Admin.module.scss';

const AdminHelp: React.FC = () => {
    return (
        <div className={styles.main}>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Add a Downloadable File
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>From the admin page, click "Manage Files"</li>
                        <li>Click "Add File"</li>
                        <li>Fill out all boxes under "Required", the rest are optional but highly encouraged</li>
                        <li>Press Submit</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Edit a Downloadable File
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>Add this</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Add a Link to an External Site
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>From the admin page, click "Manage Link"</li>
                        <li>Click "Add Link"</li>
                        <li>Fill out all boxes under "Required", the rest are optional but highly encouraged</li>
                        <li>Press Submit</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Edit a Link to an External Site
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>From the admin page, click "Manage Link"</li>
                        <li>Click "Edit Link"</li>
                        <li>Find the link you want to edit in the table, then make the change to the desired field</li>
                        <li>Changes made here are saved automatically</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    How to use the Mass Import Tool
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>From the admin page, click "Mass Import Tool"</li>
                        <li>Use THIS FILE (NOTE: Make this a link to download a file) and fill out all the data for each column</li>
                        <li>Once uploaded, it will post each row in the Guarantor format</li>
                        <li>Any unreadable rows will be ignored</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Adding Guarantors
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>From the admin page, click "Add Guarantor"</li>
                        <li>Fill out all the required fields</li>
                        <li>Once submitted, this will create a post for the given information in a premade format</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Creating Custom Posts
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>From the admin page, click "Go to Wordpress"</li>
                        <li>Log in to the Wordpress Admin portal</li>
                        <li>On the left hand side, click "Posts"</li>
                        <li>This will open a small menu on the left hand side. In this menu, click "Add New"</li>
                        <li>From here, you can design the details of your post in the center of the screen</li>
                        <li>To change any metadata about the post, such as tags and categories, use the right hand sidebar</li>
                        <li>Once you are done, you can either save as a draft for later or Publish it</li>
                        <li>When you are ready for it to be live, publish it</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Editing Custom Posts
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>From the admin page, click "Go to Wordpress"</li>
                        <li>Log in to the Wordpress Admin portal</li>
                        <li>On the left hand side, click "Posts"</li>
                        <li>This will open a list of all the posts, you can them from there</li>
                        <li>Note: Do not edit link or file posts this way</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AdminHelp;