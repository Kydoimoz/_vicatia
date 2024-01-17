import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import SignupForm from '../components/pages/SignupForm';
import { getServerSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth].js';

export default function SignupPage() {
  const [message, setMessage] = useState('');

  async function displayMessage() {
    try {
      const session = await getServerSession({
        ...authOptions,
        req: undefined,
      });

      if (session) {
        const msg = 'Session started....';
        setMessage(msg);
        console.log(message);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  }

  useEffect(() => {
    displayMessage();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignupForm />
    </div>
  );
}