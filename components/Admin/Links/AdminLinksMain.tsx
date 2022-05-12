import React, { useContext, useState } from 'react';
import styles from '../../../styles/Admin.module.scss';
import AdminLinksAdd from './AdminLinksAdd';
import ExistingLinksTable from './AdminExistingLinks';
import Link from 'next/link';
import { adminLinksContextStruct } from '../../../utils/interfaces';
import { AdminContext } from '../../../pages/_app';

const AdminLinksContext = React.createContext<adminLinksContextStruct | null>(null)

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
            case (LinkPages.LinkEdit):
                return (
                    <ExistingLinksTable />
                );
            default:
                return (
                    <React.Fragment>
                        Links Main
                        <button className={styles.main_button} onClick={() => setLinkPage(LinkPages.LinkAdd)}>Add Link</button>
                        <button className={styles.main_button} onClick={() => setLinkPage(LinkPages.LinkEdit)}>Edit Link</button>
                        List of Links here
                        <Link href="/admin">
                            <button className={styles.main_button}>Go Back</button>
                        </Link>
                    </React.Fragment>
                );
        }
    }

    return (
        <AdminLinksContext.Provider
            value={{
                linkPage,
                setLinkPage
            }}
        >
            <div className={styles.main}>
                {decidePage()}
            </div>
        </AdminLinksContext.Provider>
    );
}

enum LinkPages {
    LinkMain,
    LinkAdd,
    LinkEdit
}

export { LinkPages, AdminLinksContext };
export default AdminLinksMain;