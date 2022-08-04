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
import AdminTextBox from '../Shared/AdminTextbox';
import { AdminFilesAddData } from '../../../utils/adminInterfaces';
import AdminButton from '../Shared/AdminButton';
import styles from '../../../styles/Admin.module.scss';

//NOTE: This is how this page works. First the layout was create in Wordpress of how we wanted this data to look
//      Next we got the raw HTML of the page, and turned it into a template. Then we just take in the data we need and fill it in

interface IGuarantor {
    title: string,
    description: string,
    shortDescription: string,
    address: string,
    email: string,
    phone: string,
    website: string
}

const defaultGuarantor: IGuarantor = {
    title: '',
    description: '',
    shortDescription: '',
    address: '',
    email: '',
    phone: '',
    website: ''
}

const GuarantorMain: React.FC = () => {

    const [guarantorData, setGuarantorData] = useState<IGuarantor>(defaultGuarantor);

    const [selectedCategories, setSelectedCategories] = useState<categoryStruct[]>([]);
    const [selectedTags, setSelectedTags] = useState<tagStruct[]>([]);
    const [fileData, setFileData] = useState<AdminFilesAddData>();

    const handleSubmit = async () => {

        //Error check
        if (guarantorData.title === '') return;
        if (guarantorData.description === '') return;

        const success = await CreateGuarantorPost(guarantorData, selectedCategories, selectedTags, fileData.file);

        if (success) {
            setGuarantorData(defaultGuarantor);
            setSelectedCategories([]);
            setSelectedTags([]);
            setFileData(null);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.admin_content}>
                <h1>Add Guarantor</h1>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <h3 className={styles.admin_header}>Required</h3>
                        <AdminTextBox header="Title" value={guarantorData.title} setValue={(val: string) => setGuarantorData({ ...guarantorData, title: val })} />
                        <AdminTextBox header="Description" rows={4} value={guarantorData.description} setValue={(val: string) => setGuarantorData({ ...guarantorData, description: val })} />
                        <AdminTextBox header="Short Description" rows={3} value={guarantorData.shortDescription} setValue={(val: string) => setGuarantorData({ ...guarantorData, shortDescription: val })} />
                        <AdminTextBox
                            header='Organization Image'
                            type='file'
                            setValue={(e) => { setFileData({ ...fileData, file: e }); }}
                        />
                    </div>
                    <div style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <h3 className={styles.admin_header}>Optional</h3>
                        <AdminTextBox header="Address" value={guarantorData.address} setValue={(val: string) => setGuarantorData({ ...guarantorData, address: val })} /> {/* TODO: Replace this with an autocomplete */}
                        <AdminTextBox header="Email" value={guarantorData.email} setValue={(val: string) => setGuarantorData({ ...guarantorData, email: val })} />
                        <AdminTextBox header="Phone" value={guarantorData.phone} setValue={(val: string) => setGuarantorData({ ...guarantorData, phone: val })} />
                        <AdminTextBox header="Website" value={guarantorData.website} setValue={(val: string) => setGuarantorData({ ...guarantorData, website: val })} />
                        <CategoryDropdownAdmin {...{ selectedCategories, setSelectedCategories }} />
                        <TagDropdownAdmin {...{ selectedTags, setSelectedTags }} />
                    </div>
                </div>
            </div>
            <AdminButton message='Submit' onClick={handleSubmit} size='large' />
            <Link href="/admin">
                <AdminButton message='Go Back' onClick={() => null} />
            </Link>
        </div>
    );
}

export { type IGuarantor };
export default GuarantorMain;