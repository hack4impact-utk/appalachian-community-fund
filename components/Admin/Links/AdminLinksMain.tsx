import React, { useContext, useState } from 'react';
import styles from '../../../styles/Admin.module.scss';
import AdminLinksAdd from './AdminLinksAdd';
import ExistingLinksTable from './AdminExistingLinks';
import Link from 'next/link';
import AdminButton from '../Shared/AdminButton';
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
                        <h1>Manage Links</h1>
                        <AdminButton message='Add Link' onClick={() => setLinkPage(LinkPages.LinkAdd)} />
                        <AdminButton message='Edit Link' onClick={() => setLinkPage(LinkPages.LinkEdit)} />
                        <Link href="/admin">
                            <AdminButton message='Go Back' onClick={() => null} />
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