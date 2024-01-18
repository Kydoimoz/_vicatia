import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './Cookie.module.css';

const CookieBanner = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasGivenConsent = cookies.cookieConsent;
    if (!hasGivenConsent) {
      setIsVisible(true);
    }
  }, [cookies]);

  const handleAccept = () => {
    setCookie('cookieConsent', true, { secure: true, maxAge: 30 * 24 * 60 * 60 });
    setIsVisible(false);
  };

  return isVisible ? (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <p>We use cookies to enhance your experience on our website.</p>
        <button className={styles.acceptButton} onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  ) : null;
};

export default CookieBanner;