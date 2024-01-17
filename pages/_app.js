import AuthProviders from './Providers';

import Layout from '../components/layout/layout';
import { CookiesProvider } from 'react-cookie';
import Banner from "../components/Cookie";
import "../styles/auth.css";
import "../styles/chats.css";
import "../styles/index.css";
import '../styles/global.css';
import { ContextProvider } from '../context';
import React from 'react';

function Vicatia({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <Banner />
            <AuthProviders>
                <Layout>
                    <ContextProvider>
                    <Component {...pageProps} />
                    </ContextProvider>
                  
                </Layout>
            </AuthProviders>
        </CookiesProvider>
    );
}

export default Vicatia;