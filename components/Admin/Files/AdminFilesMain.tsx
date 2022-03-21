import React, { useContext } from 'react';
import styles from '../../../styles/Admin.module.scss';
import Link from 'next/link';
import AdminFilesAdd from './AdminFilesAdd';
import { AdminContext } from '../../../pages/_app';

const AdminFilesMain: React.FunctionComponent = () => {

    const context = useContext(AdminContext);

    if (!context) return null;

    return (
        <div className={styles.main}>
            <p>Files Main</p>
            <AdminFilesAdd />
            <Link href="/admin">
                <button className={styles.main_button}>Go Back</button>
            </Link>
        </div>
    );
}

export default AdminFilesMain;