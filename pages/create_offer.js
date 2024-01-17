import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router.js';
import CreateOfferPage from '../components/pages/CreateOfferPage';

export default function CreateOffer() {
  const router = useRouter();


  return (
    <div className={styles.container}>
      <Head>
        <title>Vicatia - Create Offer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateOfferPage />
    </div>
  );
}