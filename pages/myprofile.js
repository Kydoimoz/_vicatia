import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MyProfile from '../components/pages/MyProfile';

export default function MyProfilePage() {
  return (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <MyProfile />
      
    </div>
  );
}

 