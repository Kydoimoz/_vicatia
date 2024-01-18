import classes from './Login.module.css'
import Logo from './../../public/images/logo.png'
import Paw from './../../public/images/paw.png'
import Image from 'next/image'
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Context } from '../../context';
import axios from 'axios';

function Login() {
    const {
        username,
        setUsername,
        secret,
        setSecret,
      } = useContext(Context);
    const router = useRouter();

    var width = 1000;

    if (typeof window != 'undefined') {
        const [widths, setWidth] = useState(window.innerWidth);
        const [heights, setHeight] = useState(window.innerHeight);
        const updateDimensions = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        useEffect(() => {
            window.addEventListener("resize", updateDimensions);
            return () => window.removeEventListener("resize", updateDimensions);
        }, []);
        width = widths;
    }
    const [state, setState] = useState({
        password: "",
        email: "",
    })

    // Mit errMsg kann man über dem Button eine Error Nachricht anzeigen.
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email: state.email, password: state.password, redirect: false,
            });

            if (res.error) {
                setErrMsg("Invalid Credentials");
                return;
            }
            router.replace("home");
        }

        catch (err) {
            console.log(err);
        }
        axios.put(
            'https://api.chatengine.io/users/',
            {username, secret},
            {headers: {"Private-key": "6c2cf377-3821-4a69-9bc8-c6aeb92aeb75"}}
          )
    }
    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
        () => console.log(state)
    }

    const handleChangeEmail = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });

        setUsername(value);
    }

    const handleChangePassword = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });

        setSecret("Admin123!");
    }

    return (
        <div className={classes.container}>
            <div className={classes.logo}>
                <Link href={"/"}><Image src={Logo} draggable="false" alt='Logo' /></Link>
            </div>
            <div className={classes.reserveleft}></div>
            <div className={classes.left}>
                <div className={classes.heading}>Welcome Page</div>
                <div className={classes.description}>Sign up to<br></br>continue access</div>
                <div className={classes.paw}>
                    <Image src={Paw} alt='Paw Icon' />
                </div>
            </div>
            <div className={classes.right}>
                <div className={classes.signupas}>Login</div>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.relative}>
                        <input
                            type='email'
                            name='email'
                            value={state.email}
                            onChange={handleChangeEmail}
                            className={classes.input}
                            placeholder='Email'
                            required
                            maxLength={30}
                        />
                    </div>
                    <div className={classes.relative}>
                        <input
                            type='password'
                            name='password'
                            value={state.password}
                            onChange={handleChangePassword}
                            className={classes.input}
                            placeholder='Password'
                            required
                            maxLength={20}
                        />

                    </div>
                    <div className={classes.relative}>
                        <div className={classes.error}>{errMsg}</div>
                        <button className={classes.button} type='submit'>Login</button>
                    </div>
                </form>
                <div className={classes.existingacc}>Need an account? <Link href={"/signup"}><span className={classes.underline}>Register</span></Link></div>
            </div>

        </div>
    )
} export default Login;