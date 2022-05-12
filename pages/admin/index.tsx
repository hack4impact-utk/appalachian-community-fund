import React, { useState, useEffect } from 'react';
import { adminContextStruct } from '../../utils/interfaces';
import styles from '../../styles/Admin.module.scss';
import InvalidPage from '../../components/Admin/InvalidAdminPage';
import AdminLinksMain from '../../components/Admin/Links/AdminLinksMain';
import AdminAddressesMain from '../../components/Admin/Addresses/AdminAddressesMain';
import AdminFilesMain from '../../components/Admin/Files/AdminFilesMain';
import AdminMassImportMain from '../../components/Admin/MassImport/AdminMassImportMain';
import Link from 'next/link';
import { Button } from '@mui/material';

const AdminMain: React.FunctionComponent = () => {

    useEffect(() => {
        //TODO: Do the credential check here
    }, []);

    const DecidePage = (): React.ReactNode => {
        //TODO: Check login creds and return the invalid page if they aren't logged in
        return (
            <div className={styles.main}>
                Admin Page
                <p>If you are not an admin pls leave</p>
                <Link href="/admin/links">
                    <button className={styles.main_button}>Manage Links</button>
                </Link>
                <Link href="/admin/addresses">
                    <button className={styles.main_button}>Manage Addresses</button>
                </Link>
                <Link href="/admin/files">
                    <button className={styles.main_button}>Manage Files</button>
                </Link>
                <Link href="/admin/massimport">
                    <button className={styles.main_button}>Mass Import Tool</button>
                </Link>
                <Link href="/admin/help">
                    <button className={styles.main_button}>Help</button>
                </Link>
            </div>
        );
    }

    return (
        <React.Fragment>
            {DecidePage()}
        </React.Fragment>
    );
}

export default AdminMain;