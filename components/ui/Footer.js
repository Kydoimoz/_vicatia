import classes from './Footer.module.css';
import Mail from './../../public/svg/mail.svg';
import Phone from './../../public/svg/phone.svg';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

function Footer({ Name, Surname, Message }) {
    const { data: session } = useSession({ required: false });
    const signedIn = session?.user;
    return (
        <div className={classes.container}>
            {signedIn ? (
                <>
                    Copyright © 2023 - Vicatias | All Rights Reserved ®
                    <div className={classes.small}>
                        {Name} {Surname} (
                        <Link href={'/home'}>
                            <span className={classes.logout} onClick={() => signOut()}>{'Sign Out'}</span>
                        </Link>
                        )
                    </div>
                </>
            ) : (
                <>
                    Copyright © 2023 - Vicatias | All Rights Reserved ®
                    <div className={classes.small}>
                        {Message}{' '}
                        <Link href={'/signup'}>
                            <span className={classes.signup}>{'Sign Up'}</span>
                        </Link>{' '}
                        to access additional features.
                    </div>
                </>
            )}
        </div>
    );
}
export default Footer;