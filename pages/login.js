import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Login from '../components/pages/Login.js';
import { useEffect } from 'react';
import { getServerSession } from "next-auth/react";
import { useRouter } from 'next/router.js';
import { authOptions } from './api/auth/[...nextauth].js';

export default function LoginPage() {
  const router = useRouter();


  return (
    <div className={styles.container}>
      <Head>
        <title>Vicatia - LogIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </div>
  );
}