import React, { useState, useEffect } from 'react';
import { adminContextStruct } from '../../utils/interfaces';
import styles from '../../styles/Admin.module.scss';
import InvalidPage from '../../components/Admin/InvalidAdminPage';
import AdminLinksMain from '../../components/Admin/Links/AdminLinksMain';
import AdminAddressesMain from '../../components/Admin/Addresses/AdminAddressesMain';
import AdminFilesMain from '../../components/Admin/Files/AdminFilesMain';
import AdminMassImportMain from '../../components/Admin/MassImport/AdminMassImportMain';
import Link from 'next/link';
import AdminButton from '../../components/Admin/Shared/AdminButton';
import { Button } from '@mui/material';

const AdminMain: React.FunctionComponent = () => {

    useEffect(() => {
        //TODO: Do the credential check here
    }, []);

    const DecidePage = (): React.ReactNode => {
        //TODO: Check login creds and return the invalid page if they aren't logged in
        return (
            <div className={styles.main}>
                <h1>Admin Page</h1>
                <p>If you are not an admin pls leave</p>
                <Link href="/admin/links">
                    <AdminButton message='Manage Links' onClick={() => null} />
                </Link>
                {/* <Link href="/admin/addresses">
                    <AdminButton message='Manage Addresses' onClick={() => null} />
                </Link> */}
                <Link href="/admin/files">
                    <AdminButton message='Manage Files' onClick={() => null} />
                </Link>
                <Link href="/admin/massimport">
                    <AdminButton message='Mass Import Tool' onClick={() => null} />
                </Link>
                <Link href="/admin/guarantor">
                    <AdminButton message='Add Guarantor' onClick={() => null} />
                </Link>
                <Link href="/admin/help">
                    <AdminButton message='Help' onClick={() => null} />
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