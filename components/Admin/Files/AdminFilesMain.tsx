import React, { useContext, useState } from 'react';
import styles from '../../../styles/Admin.module.scss';
import Link from 'next/link';
import AdminFilesAdd from './AdminFilesAdd';
import AdminFilesEdit from './AdminFilesEdit';
import AdminButton from '../Shared/AdminButton';
import { adminFilesContextStruct } from '../../../utils/interfaces';
import { AdminContext } from '../../../pages/_app';

const AdminFilesContext = React.createContext<adminFilesContextStruct | null>(null);

const AdminFilesMain: React.FunctionComponent = () => {

    const context = useContext(AdminContext);

    const [filePage, setFilePage] = useState<FilePage>(FilePage.FileMain);

    if (!context) return null;

    const decidePage = (): React.ReactNode => {
        switch (filePage) {
            case (FilePage.FileAdd):
                return (
                    <AdminFilesAdd />
                );
            case (FilePage.FileEdit):
                return (
                    <AdminFilesEdit />
                );
            default:
                return (
                    <React.Fragment>
                        <h1>Manage Files</h1>
                        <AdminButton message='Add File' onClick={() => setFilePage(FilePage.FileAdd)} />
                        <AdminButton message='Edit Files' onClick={() => setFilePage(FilePage.FileEdit)} />
                        <Link href="/admin">
                            <AdminButton message='Go Back' onClick={() => null} />
                        </Link>
                    </React.Fragment>
                );
        }
    }

    return (
        <AdminFilesContext.Provider
            value={{
                filePage,
                setFilePage
            }}
        >
            <div className={styles.main}>
                {decidePage()}
            </div>
        </AdminFilesContext.Provider>
    );
}

enum FilePage {
    FileMain,
    FileAdd,
    FileEdit
}

export { FilePage, AdminFilesContext };
export default AdminFilesMain;