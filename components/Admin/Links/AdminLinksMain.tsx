import React, { useContext, useState } from 'react';
import styles from '../../../styles/Admin.module.scss';
import AdminLinksAdd from './AdminLinksAdd';
import Link from 'next/link';
import { AdminContext } from '../../../pages/_app';

const AdminLinksMain: React.FunctionComponent = () => {

    const context = useContext(AdminContext);

    const [linkPage, setLinkPage] = useState<LinkPages>(LinkPages.LinkMain);

    if (!context) return null;

    const decidePage = (): React.ReactNode => {
        switch (linkPage) {
            case (LinkPages.LinkAdd):
                return (
                    <AdminLinksAdd />
                );
            default:
                return (
                    <React.Fragment>
                        Links Main
                        <button className={styles.main_button} onClick={() => setLinkPage(LinkPages.LinkAdd)}>Add Link</button>
                        List of Links here
                        <Link href="/admin">
                            <button className={styles.main_button}>Go Back</button>
                        </Link>
                    </React.Fragment>
                );
        }
    }

    return (
        <div className={styles.main}>
            {decidePage()}
        </div>
    );
}

enum LinkPages {
    LinkMain,
    LinkAdd
}

export default AdminLinksMain;