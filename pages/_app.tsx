import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
import Script from 'next/script';
import Navbar from '../components/navbar';
import '../styles/globals.scss';
import { adminContextStruct } from '../utils/interfaces';
import { GetAllStatesAsync, IState } from '../utils/dataHelper';
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

    const [isLoading, setIsLoading] = useState<number>(0);
    const [allStates, setAllStates] = useState<IState[]>([]);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        //Load stuff here that only needs to be loaded once
        const states = await GetAllStatesAsync();
        setAllStates(states);
    }

    const StartLoad = () => {
        console.log(`Starting Load on ${isLoading+1}`);
        setIsLoading(isLoading + 1);
    }

    const EndLoad = () => {
        console.log(`End Load on ${isLoading-1}`);
        if (isLoading - 1 > 0) {
            setIsLoading(isLoading - 1);
        } else {
            setIsLoading(0);
        }
        
    }

    return (
        <>
            <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCswu5h7nMIC7q-6jDDS_QlTiVImormie0&libraries=places" />
            <ToastContainer 
                position='bottom-right'
            />
            <ClipLoader color="#ed031a" loading={isLoading > 0} size={150} cssOverride={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginTop: -75,
                marginLeft: -75
            }} />

            <Navbar {...navLinks} />
            <AdminContext.Provider
                value={{
                    StartLoad,
                    EndLoad,
                    allStates
                }}
            >
                <Component {...pageProps} />
            </AdminContext.Provider>
        </>

    )
}

export { AdminContext, AdminPages }
export default MyApp;
