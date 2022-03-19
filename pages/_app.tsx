import { AppProps } from 'next/app';
import Navbar from '../components/navbar';
import '../styles/globals.scss';
import { navLinks } from '../utils/navlinks';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Navbar {...navLinks} />
            <Component {...pageProps} />
        </>

    )
}

export default MyApp
