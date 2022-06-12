import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateGuarantorPost } from '../../../utils/guarantorHelper';
import { categoryStruct, tagStruct } from '../../../utils/interfaces';
import { WP_Post } from '../../../utils/wordpressInterfaces';
import { GetAuth } from '../../../lib/auth';
import CategoryDropdownAdmin from '../Shared/CategoryDropdown';
import TagDropdownAdmin from '../Shared/TagsDropdown';
import styles from '../../../styles/Admin.module.scss';

//NOTE: This is how this page works. First the layout was create in Wordpress of how we wanted this data to look
//      Next we got the raw HTML of the page, and turned it into a template. Then we just take in the data we need and fill it in

interface IGuarantor {
    title: string,
    description: string,
    shortDescription: string,
    address: string,
    email: string,
    phone: string
}

const defaultGuarantor: IGuarantor = {
    title: '',
    description: '',
    shortDescription: '',
    address: '',
    email: '',
    phone: ''
}

const GuarantorMain: React.FC = () => {

    const [guarantorData, setGuarantorData] = useState<IGuarantor>(defaultGuarantor);

    const [selectedCategories, setSelectedCategories] = useState<categoryStruct[]>([]);
    const [selectedTags, setSelectedTags] = useState<tagStruct[]>([]);
    const [fileData, setFileData] = useState<File>();

    const handleSubmit = async () => {

        //Error check
        if (guarantorData.title === '') return;
        if (guarantorData.description === '') return;

        const success = await CreateGuarantorPost(guarantorData, selectedCategories, selectedTags, fileData);

        if (success) {
            setGuarantorData(defaultGuarantor);
            setSelectedCategories([]);
            setSelectedTags([]);
            setFileData(null);
        }
    }

    return (
        <div className={styles.main}>
            <h2>Add a Guarantor Here</h2>
            <form>
                <input className={styles.file_input} value={guarantorData.title} onChange={e => setGuarantorData({ ...guarantorData, title: e.target.value})} placeholder='Title' required={true} />
                <input className={styles.file_input} value={guarantorData.address} onChange={e => setGuarantorData({ ...guarantorData, address: e.target.value})} placeholder='Address' /> {/* TODO: Replace this with an autocomplete */}
                <input className={styles.file_input} value={guarantorData.email} onChange={e => setGuarantorData({ ...guarantorData, email: e.target.value})} placeholder='Email' />
                <input className={styles.file_input} value={guarantorData.phone} onChange={e => setGuarantorData({ ...guarantorData, phone: e.target.value})} placeholder='Phone' />
                <input 
                    className={styles.file_input}
                    type="file"
                    onChange={(e) => setFileData(e.target.files[0])}
                />
                <CategoryDropdownAdmin {...{ selectedCategories, setSelectedCategories }} />
                <TagDropdownAdmin {...{ selectedTags, setSelectedTags }} />
                <textarea className={styles.file_input} rows={4} cols={30} value={guarantorData.description} onChange={e => setGuarantorData({ ...guarantorData, description: e.target.value})} placeholder='Description' required={true} />
                <textarea className={styles.file_input} rows={3} cols={30} value={guarantorData.shortDescription} onChange={e => setGuarantorData({ ...guarantorData, shortDescription: e.target.value})} placeholder='Short Description' />
                <button type="button" className={styles.file_input} onClick={handleSubmit}>Submit</button>
            </form>
            <Link href="/admin">
                <button className={styles.main_button}>Go Back</button>
            </Link>
        </div>
    );
}

export { type IGuarantor };
export default GuarantorMain;