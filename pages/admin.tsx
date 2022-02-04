import React from 'react';
import { adminContextStruct } from '../utils/interfaces';

const AdminContext = React.createContext<adminContextStruct | null>(null);

const AdminMain: React.FunctionComponent = () => {
    return (
        <AdminContext.Provider
            value={{
                fillerProperty: 'test'
            }}
        >
            <div>
                Admin Page
            </div>
        </AdminContext.Provider>
    );
}

export { AdminMain };
export default AdminContext;