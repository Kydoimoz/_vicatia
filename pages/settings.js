import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Settings from '../components/pages/Settings';

export default function SettingsPage() {
  return (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Settings />
    </div>
  );
}

 