import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './PageViewTracker.module.css';

const PageViewTracker = () => {
    const [cookies, setCookie] = useCookies(['pageViews']);

    useEffect(() => {
        const currentViews = cookies.pageViews || 0;
        const newViews = currentViews + 1;
        setCookie('pageViews', newViews, { path: '/home' });
        console.log(`Page Views: ${newViews}`);
    }, [setCookie, cookies.pageViews]);

    return null;
};

export default PageViewTracker;