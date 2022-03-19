import React, { useState, useEffect } from 'react';
import { adminContextStruct } from '../utils/interfaces';
import styles from '../styles/Admin.module.scss';
import InvalidPage from '../components/Admin/InvalidAdminPage';
import AdminLinksMain from '../components/Admin/AdminLinksMain';
import AdminAddressesMain from '../components/Admin/AdminAddressesMain';
import AdminFilesMain from '../components/Admin/AdminFilesMain';
import { Button } from '@mui/material';

const AdminContext = React.createContext<adminContextStruct | null>(null);

const AdminMain: React.FunctionComponent = () => {

    const [currentAdminPage, setCurrentAdminPage] = useState<AdminPages>(AdminPages.Invalid);

    useEffect(() => {
        //TODO: Do the credential check here
        setCurrentAdminPage(AdminPages.AdminHome);
    }, []);

    const SwitchAdminPage = (page: AdminPages) => {
        setCurrentAdminPage(page);
    }

    const DecidePage = (): React.ReactNode => {
        switch (currentAdminPage) {
            case (AdminPages.AdminHome):
                return (
                    <div className={styles.main}>
                        Admin Page
                        <p>If you are not an admin pls leave</p>
                        <button className={styles.main_button} onClick={() => SwitchAdminPage(AdminPages.AdminLinks)}>Manage Links</button>
                        <button className={styles.main_button} onClick={() => SwitchAdminPage(AdminPages.AdminAddresses)}>Manage Addresses</button>
                        <button className={styles.main_button} onClick={() => SwitchAdminPage(AdminPages.AdminFiles)}>Manage Files</button>
                    </div>
                );
            case (AdminPages.AdminLinks):
                return (
                    <AdminLinksMain />
                );
            case (AdminPages.AdminAddresses):
                return (
                    <AdminAddressesMain />
                );
            case (AdminPages.AdminFiles):
                return (
                    <AdminFilesMain />
                );
            default:
                return <InvalidPage />
        }
    }

    return (
        <AdminContext.Provider
            value={{
                currentAdminPage,
                SwitchAdminPage
            }}
        >
            {DecidePage()}
        </AdminContext.Provider>
    );
}

enum AdminPages {
    AdminHome,
    AdminLinks,
    AdminAddresses,
    AdminFiles,
    Invalid
}

export { AdminContext, AdminPages };
export default AdminMain;