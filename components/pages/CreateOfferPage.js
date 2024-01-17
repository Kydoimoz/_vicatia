import styles from './Settings.module.css'
import classes from './CreateOfferPage.module.css'
import Image from 'next/image';
import PayImg from './../../public/images/payment.jpg';
import Header from '../ui/Header';
import { useEffect } from 'react';
import { useSession, getServerSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import Footer from '../ui/Footer';
function CreateOfferPage(){
    const { data: session } = useSession({ required: false });
    console.log(JSON.stringify(session?.user));
  
  
    useEffect(() => {
      const checkSession = async () => {
        try {
          const serverSession = await getSession(authOptions);
          if (!serverSession) {
            console.log('currently no session..');
          }
        } catch (err) {
          console.error('Error checking session:', err);
        }
      };
  
      checkSession();
    }, []);
    const sessiondata = {
      id: session?.user?._id,
      firstname: session?.user?.firstName,
      lastname: session?.user?.lastName,
      email: session?.user?.email,
    };
    useEffect(() => {
      sessionStorage.setItem("user", JSON.stringify(sessiondata));
      sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')).email;
      sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')).firstName
    }, []);
  
  
    return (
        <>
              <Header
        signedIn={session?.user}
        profilePic={session?.user?.image}
        Name={session?.user?.firstName}
        Surname={session?.user?.lastName}
      />
        <div className={classes.main}>
        <div className={styles.p_container}>
            <div className={styles.page_title}>
              Create an Offer!
            </div>
            <form className={classes.form}>
                <input className={classes.selectinput} placeholder='Card Number'  />
                <input className={classes.selectinput} placeholder='CVS / CVV'  />
                <input className={classes.selectinput} placeholder='Expiration Date' type='date'  />
                <input className={classes.selectinput} placeholder='Card Name'  />
                <input className={classes.selectinput} placeholder='Amount'  />
                <div className={classes.image_holder}>
                    <Image src={PayImg} fill alt='Payment' />
                </div>
                <button className={classes.signup_btn}>Finish</button>
            </form>
            <div className={styles.page_title}></div>
        </div>
        </div>
        <Footer Name={session?.user?.firstName} Surname={session?.user?.lastName} />
        </>
    )
} export default CreateOfferPage;