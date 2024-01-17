import classes from './Signup.module.css'
import Logo from './../../public/images/logo.png'
import Paw from './../../public/images/paw.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
function Signup() {

    return (
        <div className={classes.c_container}>
            <div className={classes.c_logo}>
                <Image src={Logo} draggable="false" alt='Logo' />
            </div>
            <div className={classes.c_reserveleft}></div>
            <div className={classes.c_left}>
                <div className={classes.c_heading}>Welcome Page</div>
                <div className={classes.c_description}>Sign up to<br></br>continue access</div>
                <div className={classes.c_paw}>
                    <Image src={Paw} alt='Paw Icon' />
                </div>
            </div>
            <div className={classes.c_right}>
                <div className={classes.c_signupas}><span>Sign up</span><span>as</span></div>
                <Link href={"signup/as_petowner"}><div className={classes.c_button}>Pet Owner</div></Link>
                <div className={classes.c_or}>OR</div>
                <Link href={"signup/as_petsitter"}><div className={classes.c_button}>Pet Sitter</div></Link>
                <div className={classes.c_existingacc}>Already have an account? <Link href={"/login"}><span className={classes.c_underline}>Login</span></Link></div>
            </div>
        </div>
    )
} export default Signup;