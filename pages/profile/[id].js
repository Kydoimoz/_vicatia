import { useEffect } from 'react';
import Header from '../../components/ui/Header';
import classes from '../../components/pages/Homepage.module.css';
import Footer from '../../components/ui/Footer';
import { useSession, getServerSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import ProfilePage from '../../components/pages/Profile';
function ProfileID() {
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
    <div className={classes.container}>
      <Header
        signedIn={session?.user}
        profilePic={session?.user?.image}
        Name={session?.user?.firstName}
        Surname={session?.user?.lastName}
      />

      <ProfilePage />

      <Footer Name={session?.user?.firstName} Surname={session?.user?.lastName} Message="(Sign Out)" />
    </div>
  );
}

export default ProfileID;