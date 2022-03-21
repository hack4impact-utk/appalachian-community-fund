import React from 'react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { useContext } from 'react';
import Navbar from '../components/navbar';
import '../styles/globals.scss';
import { adminContextStruct } from '../utils/interfaces';
import { navLinks } from '../utils/navlinks';

const AdminContext = React.createContext<adminContextStruct | null>(null);

enum AdminPages {
    AdminHome,
    AdminLinks,
    AdminAddresses,
    AdminFiles,
    AdminMassImport,
    Invalid
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    //&callback=initMap
    return (
        <>
            <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCswu5h7nMIC7q-6jDDS_QlTiVImormie0&libraries=places" />

            <Navbar {...navLinks} />
            <AdminContext.Provider
                value={{
                    testString: 'test'
                }}
            >
                <Component {...pageProps} />
            </AdminContext.Provider>
        </>

    )
}

export { AdminContext, AdminPages }
export default MyApp;
