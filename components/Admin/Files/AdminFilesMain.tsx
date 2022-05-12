import React, { useContext } from 'react';
import styles from '../../../styles/Admin.module.scss';
import Link from 'next/link';
import AdminFilesAdd from './AdminFilesAdd';
import { AdminContext } from '../../../pages/_app';

//const AdminFilesContext = React.createContext();

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

enum LinkPages {
    FileMain,
    FileAdd,
    FileEdit
}

export default AdminFilesMain;