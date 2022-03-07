import { AppProps } from 'next/app';
import Script from 'next/script';
import Navbar from '../components/navbar';
import '../styles/globals.scss';
import { navLinks } from '../utils/navlinks';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCswu5h7nMIC7q-6jDDS_QlTiVImormie0&libraries=places&callback=initMap" />

            <Navbar {...navLinks} />
            <Component {...pageProps} />
        </>

    )
}

export default MyApp;
