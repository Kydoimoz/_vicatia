import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './Providers';
import '../styles/global.css';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import Banner from "../components/Cookie";
import "../styles/auth.css";
import "../styles/chats.css";
import "../styles/index.css";
import { ContextProvider } from '../context';

function Vicatia({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <Banner />
            <AuthProvider>
                <Layout>
                    <ContextProvider>
                    <Component {...pageProps} />
                    </ContextProvider>
                  
                </Layout>
            </AuthProvider>
        </CookiesProvider>
    );
}

export default Vicatia;