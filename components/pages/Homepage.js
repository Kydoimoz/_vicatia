import { useState } from 'react';
import Header from '../ui/Header';
import classes from './Homepage.module.css';
import Image from 'next/image';
import ExamplePic from './../../public/images/paw.png'
import Footer from '../ui/Footer';
import BackgroundTop from '../../public/images/image_bt.png';
import BackgroundBottom from '../../public/images/home_bb.png';
import Link from 'next/link';
// import BackgroundBottom from './../../public/svg/homepage-background-bottom.svg';
function HomePage() {

    return (
        <div className={classes.container}>
            <div className={classes.background_top}>
                <div className={classes.left}>
                    <div className={classes.box_description}>
                        <div className={classes.top_text}>We are a platform that brings people together, offering job opportunities while fostering a helpful community for pet owners</div>
                    </div>
                </div>
                <div className={classes.stick_right}>
                    <div className={classes.right}>
                       <div>
                       <div className={classes.right_title}>Entrust your<br></br> worries to <br></br>petsitters</div>
                       <div className={classes.right_subtitle}>Hire the best petsitter now!</div> 
                       </div>
                       <Link href='/petsitters' className={classes.right_button}><div>Browse Petsitters</div></Link>
                    </div>
                </div>
            </div>
            <div className={classes.background_bottom}>
                <div className={classes.petsitter}>
                    <div>
                        <div className={classes.right_title}>Create additional<br></br> earnings on <br></br>the side</div>
                        <div className={classes.right_subtitle}>Register now!</div> 
                    </div>
                    <Link href='/signup' className={classes.right_button}><div>Become a Petsitter</div></Link>
                </div>
            </div>    
        </div>
    )
} export default HomePage;