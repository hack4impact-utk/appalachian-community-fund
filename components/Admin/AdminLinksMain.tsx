import React, { useContext } from 'react';
import styles from '../../styles/Admin.module.scss';
import { AdminPages, AdminContext } from '../../pages/admin';

const AdminLinksMain: React.FunctionComponent = () => {

    const context = useContext(AdminContext);

    if (!context) return null;

    return (
        <div className={styles.main}>
            Links Main
            <button className={styles.main_button} onClick={() => context.SwitchAdminPage(AdminPages.AdminHome)}>Go Back</button>
        </div>
    );
}

export default AdminLinksMain;