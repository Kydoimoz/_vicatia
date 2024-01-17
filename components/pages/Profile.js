import classes from './Profile.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import LocationSVG from './../../public/svg/location.svg'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import Pen from './../../public/svg/pen.svg'
import UploadControl from '../pages/functionals/UploadControl'
import PetCard from './functionals/PetCard'
import DisplayRating from './functionals/DisplayRating'
import RatingCard from './functionals/RatingCard'
import { fetchData } from 'next-auth/client/_utils'
import { useRouter } from 'next/router'
function ProfilePage(){
    const {data: session} = useSession();


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
    }
    
    })

    const [user, setUser] = useState({
        role: "petowner",//session?.user?.role
        name: "N.",
        surname: "N.",
        city: "",
        profileImage: "",
        birthdate: "",
        gender: "",
        phone: "",
        email: session?.user?.email,
        about_me: session?.user?.description,
        services: ["Sit", "Shit", "Rit", "Git", "Göt", "Basketball", "let", "met", "ret", "get"],
        workplaces: ["asfd", "jkl", "fdasölfj", "adf"],
        pets_sit: ["aösdlf", "aöslkdfj", "asdölf"]
    });

    const handleUploadImage = ({ target: { files } }) => {

    };

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

          // Verwende die useRouter-Hook, um auf den Router zuzugreifen
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
        try {
            // Holen Sie die user_id aus den Routenparametern
            const { id } = router.query;
            console.log(id, "User_id")

            // Überprüfen Sie, ob id definiert ist, bevor Sie die Anfrage senden
            if (id) {
                const res = await fetch(`/api/props/getdt/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(
                        data
                    );
                    console.log(data);
                } else {
                    console.log("Response not ok");
                }
            } else {
                console.log("ID is undefined");
            }
        } catch (err) {
            console.error(err);
        }
    };

    fetchUser();
}, [router.query.id]);
    return (
        <div className={classes.container}>
            {user.role == "petsitter" ? <main className={classes.main}>
            <div className={classes.main_information}>
                    <div className={classes.profile_image}>
                        <Image src={"https://static.wikia.nocookie.net/jorjorswackyjourney/images/3/30/Rihqw92yzpoypx8azfvc.png/revision/latest?cb=20180715145752"} alt='Profile Image' fill />
                    </div>
                    <div className={classes.priority_information}>
                        <div className={classes.priority_row_1}>
                            <div className={classes.name}>{user.firstName} {user.lastName}</div>
                            <div className={classes.location}><LocationSVG className={classes.loc} /> {user.city}</div>
                        </div>
                        <div className={classes.priority_row_2}>
                            {capitalizeFirstLetter(user.role)}
                        </div>
                        <div className={classes.rating}>
                            <DisplayRating rating={3} />
                        </div>
                        <div className={classes.about_me}>
                            <div className={classes.about_me_title}><span className={classes.title}>About me</span></div>
                            <div className={classes.about_me_text}>{user.description}</div>
                        </div>
                        <Link href={"../create_offer"}><div className={classes.create_offer}>Create Offer</div></Link>
                    </div>
                </div>
                <div className={classes.information_container}>
                    <div className={classes.left}>
                        <div className={classes.basic_information}>
                            <div className={classes.basic_information_title}><span className={classes.title}>Basic Information</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Birthday:</span><span className={classes.value}>{user.birthDate}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Gender:</span><span className={classes.value}>{user.gender}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Phone:</span><span className={classes.value}>{user.phoneNumber}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Email:</span><span className={classes.value}>{user.email}</span></div>
                        </div>
                        <div className={classes.myservices}>
                            <div className={classes.basic_information_title}><span className={classes.title}>My Services</span></div>
                            <div className={classes.my_services_container}>
                                {user.services.map((service, index) => {
                                    return <div className={classes.service_item} key={index}>{service}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.myservices}>
                            <div className={classes.basic_information_title}><span className={classes.title}>I'd love to sit </span> </div>
                            <div className={classes.my_services_container}>
                                {user.pets_sit.map((service, index) => {
                                    return <div className={classes.service_item} key={index}>{service}</div>
                                })}
                            </div>
                        </div>
                        <div className={classes.myservices}>
                            <div className={classes.basic_information_title}><span className={classes.title}>I work in </span></div>
                            <div className={classes.my_services_container}>
                                {user.workplaces.map((service, index) => {
                                    return <div className={classes.service_item} key={index}>{service}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.placeholder}></div>
            </main> : <main className={classes.main}>
                <div className={classes.main_information}>
                    <div className={classes.profile_image}>
                        <Image src={"https://static.wikia.nocookie.net/jorjorswackyjourney/images/3/30/Rihqw92yzpoypx8azfvc.png/revision/latest?cb=20180715145752"} layout='fill' />
                    </div>
                    <div className={classes.priority_information}>
                        <div className={classes.priority_row_1}>
                            <div className={classes.name}>{user.name} {user.surname}</div>
                            <div className={classes.location}><LocationSVG className={classes.loc} /> {user.city}</div>
                
                        </div>
                        <div className={classes.priority_row_2}>
                            {capitalizeFirstLetter(user.role)}
                        </div>
                        <div className={classes.about_me}>
                            <div className={classes.about_me_title}><span className={classes.title}>About me</span></div>
                            <div className={classes.about_me_text}>{user.about_me}</div>
                        </div>
                    </div>
                </div>
            </main>}
        </div>
    );
} export default ProfilePage;