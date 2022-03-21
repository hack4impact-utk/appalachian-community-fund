import React, { useContext } from 'react';
import styles from '../../../styles/Admin.module.scss';
import Link from 'next/link';
import AdminAddressAdd from './AdminAddressAdd';
import { AdminContext } from '../../../pages/_app';

const AdminAddressesMain: React.FunctionComponent = () => {

    const context = useContext(AdminContext);

    if (!context) return null;

    return (
        <div className={styles.main}>
            <p>Address Main</p>
            <AdminAddressAdd />
            <Link href="/admin">
                <button className={styles.main_button}>Go Back</button>
            </Link>
        </div>
    );
}

export default AdminAddressesMain;