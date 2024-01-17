import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/VerifyForm.module.css';

export default function VerifyForm() {
    const router = useRouter();
    const { token } = router.query;
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alreadyVerified, setAlreadyVerified] = useState(false);
    const [linkExpired, setLinkExpired] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    console.log(token);
                    setLoading(true);
                    console.log('Request Payload:', JSON.stringify({ token }));

                    const res = await fetch(`/api/verification/${token}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token}),
                    });

                    // Fetch the JSON data from the response
                    const data = await res.json();

                    console.log("Info: ", data);

                    if (!data) {
                        throw new Error('Empty response data');
                    }

                    console.log('Verification Status:', data.message);
                    setVerificationStatus(data.message);

                    // Check for successful HTTP status code
                    if (res.status === 200) {
                        setAlreadyVerified(true);
                    }

                    const expirationTime = new Date().getTime() + 10 * 60 * 1000;

                    if (new Date().getTime() > expirationTime) {
                        setLinkExpired(true);
                    }
                } else {
                    setVerificationStatus('Invalid verification link');
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setVerificationStatus('Error verifying email');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        if (alreadyVerified || linkExpired) {
            setTimeout(() => {
                router.push('/home');
            }, 3000);
        }
    }, [alreadyVerified, linkExpired, router]);

    return (
        <div className={styles.container}>
            {loading && (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                </div>
            )}

            {!loading && (
                <div>
                    {alreadyVerified && (
                        <p>You have already been verified. You are permitted to return to our homepage - you will be redirected in a bit...</p>
                    )}
                    {linkExpired && (
                        <p>Link has expired. Please request a new verification link.</p>
                    )}
                    {verificationStatus === 'Error verifying email' && (
                        <p>There was an error verifying your email. Please try again later.</p>
                    )}
                    {verificationStatus === 'Invalid verification link' && (
                        <p>Invalid verification link. Please check your email or contact support.</p>
                    )}
                </div>
            )}
        </div>
    );
}