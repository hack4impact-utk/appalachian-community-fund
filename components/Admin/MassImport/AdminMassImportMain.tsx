import React, { useContext } from 'react';
import styles from '../../../styles/Admin.module.scss';
import Link from 'next/link';
import { AdminContext } from '../../../pages/_app';

const AdminMassImportMain: React.FunctionComponent = () => {

    const context = useContext(AdminContext);

    if (!context) return null;

    return (
        <div className={styles.main}>
            Mass Import Main
            <Link href="/admin">
                <button className={styles.main_button}>Go Back</button>
            </Link>
        </div>
    );
}

export default AdminMassImportMain;