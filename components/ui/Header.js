import classes from './Header.module.css';
import Logo from '../uielements/logo';
import Link from 'next/link';
import Image from 'next/image';
import Sitter from './../../public/svg/sitter.svg';
import Chat from './../../public/svg/chat.svg';
import { signOut, signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';
import { useState } from 'react';

function Header({ signedIn, profilePic, Name, Surname }) {
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

    function handleMenuClick() {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    }

    const handleSignOut = async () => {
        try {

            await signOut();
            router.push("/home")
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    const { data: session } = useSession();
    signedIn = session?.user;
    function Signup() {
        return router.replace("/signup");
    }

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div className={`${classes.menu_btn} ${menuOpen ? classes.open : ''}`} onClick={handleMenuClick}>
                    <div className={classes.menu_btn_burger}></div>
                </div>
                <div className={classes.links}>
                    <Link href={'/petsitters'}>
                        <div className={classes.column}>
                            <div className={classes._text}>Pet sitters</div>
                            <div className={classes.svg}>
                                <Sitter className={classes.self_svg} />
                            </div>
                        </div>
                    </Link>
                    <Link href={'/chats'}>
                        <div className={classes.column}>
                            <div className={classes._text}>Chat</div>
                            <div className={classes.svg}>
                                <Chat className={classes.self_svg} />
                            </div>
                        </div>
                    </Link>

                    {signedIn ? (
                        <div className={classes.column}>
                            <Link href={"/myprofile"}>
                            <div className={classes.acc_field}>
                            <div className={classes.account_name}>{`${Name} ${Surname}`}</div>
                            <div className={classes.account}><Image width={200} height={200} src={profilePic} alt='Profile Picture' /></div>
                            </div>

                            </Link>
                            <div className={classes.signout_btn} onClick={() => handleSignOut()}>Sign Out</div>
                        </div>
                    ) : (
                        <>
                            <div className={classes.sign_field}>
                                <div className={classes.signin_btn} onClick={() => signIn()}>Sign in</div>
                                <span className={classes.or_seperator}>or</span>
                                <div className={classes.signup_btn} onClick={() => Signup()}>Sign up</div>
                            </div>
                        </>
                    )}
                </div>
            </header>
            <menu className={`${menuOpen ? classes.openMenu : classes.closed}`}>
                <div className={classes.menu_container}>
                    <div className={classes.list_item_1}>
                        <Link href={"/petsitters"}>
                            <div className={classes.column}>
                                <div className={classes._text}>Pet sitters</div>
                                <div className={classes.svg}><Sitter className={classes.self_svg} /></div> 
                            </div>
                        </Link>
                    </div>
                    <div className={classes.list_item_1}>
                        <Link href={"/chats"}>
                            <div className={classes.column}>
                                <div className={classes._text}>Chat</div>
                                <div className={classes.svg}><Chat className={classes.self_svg} /></div> 
                            </div>
                        </Link>
                    </div>
                    <div className={classes.list_item_1}>
                        <Link href={"/login"}>
                            <div className={classes.column}>
                                <div className={classes._text}>Sign in</div>
                            </div>
                        </Link>
                    </div>
                    <div className={classes.list_item_2}>
                        <Link href={"/signup"}>
                            <div className={classes.column}>
                                <div className={classes._text}>Sign up</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </menu>
        </div>
    );
}

export default Header;