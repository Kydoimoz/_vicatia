import classes from './MyProfile.module.css'
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
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import { useRouter } from 'next/router'

function MyProfile() {
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        try {
          const serverSession = await getSession(); // Du musst die `authOptions` hier nicht verwenden
       
            if (!serverSession) {
                router.replace('/login');
                console.log('currently no session..');
              }
          
        } catch (err) {
          console.error('Error checking session:', err);
        }
      };
  
      checkSession();
    }, [router]);

    const [user, setUser] = useState({
        role: session?.user?.role,
        name: session?.user?.firstName,
        surname: session?.user?.lastName,
        city: session?.user?.city,
        profileImage: session?.user?.image,
        birthdate: session?.user?.birthDate,
        gender: session?.user?.gender,
        phone: session?.user?.phoneNumber,
        email: session?.user?.email,
        about_me: session?.user?.description,
       
        my_services: session?.user?.services || [],
        pets_sit: session?.user?.pets_sit || [],
        workplaces: session?.user?.workplaces || [],
    });

    const [uploadedImage, setUploadedImage] = useState(null);

    const handleUploadImage = async({ target: { files } }) => {
      try {
        if (files && files[0]) {
          const imageUrl = URL.createObjectURL(files[0]);
          console.log(typeof imageUrl);
          // Make a PUT request to update the user's image
          const response = await fetch('/api/updateUserImage', {
            cache: "no-store",
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ n_image: imageUrl, _id: session?.user?._id }),
          });
          const data = await response.json();
          console.log("Data: " ,data);
          if (response.ok) {
            console.log('User image updated successfully');
            setUser({ ...user, image: imageUrl });
          } else {
            console.error('Failed to update user image');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleDeletePicture = ({ target: { files } }) => {
      setUser({...user, profileImage: "https://static.wikia.nocookie.net/jorjorswackyjourney/images/3/30/Rihqw92yzpoypx8azfvc.png/revision/latest?cb=20180715145752"})
    }

    function capitalizeFirstLetter(str) {
        if(str != undefined){
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
  
    return (
      <>
      <Header 
      Name={session?.user?.firstName}
      Surname={session?.user?.lastName}
      signedIn={session?.user}
      profilePic={session?.user?.image}/>
        <div className={classes.container}>
            {user.role == "petsitter" ? <main className={classes.main}>
            <div className={classes.main_information}>
                    <div className={classes.profile_image}>
                        <div className={classes.p_i}><Image src={user.profileImage} layout='fill' objectFit='cover' alt='profile image' draggable='false'  /></div>
                        {/* <div className={classes.upload}>
                            <UploadControl onChange={handleUploadImage} accept="image/*">
                                Upload
                            </UploadControl>
                        </div>
    <div onClick={handleDeletePicture} className={classes.delete}>Delete</div>*/}
                    </div>
                    <div className={classes.priority_information}>
                        <div className={classes.priority_row_1}>
                            <div className={classes.name}>{user.name} {user.surname}</div>
                            <div className={classes.location}><LocationSVG className={classes.loc} /> {user.city}</div>
                            <Link href="/settings" ><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link>
                        </div>
                        <div className={classes.priority_row_2}>
                            {capitalizeFirstLetter(user.role)}
                        </div>
                        <div className={classes.rating}>
                            <DisplayRating rating={2} />
                        </div>
                        <div className={classes.about_me}>
                            <div className={classes.about_me_title}><span className={classes.title}>About me</span> <Link href="/settings"><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link></div>
                            <div className={classes.about_me_text}>{user.about_me}</div>
                        </div>
                    </div>
                </div>
                <div className={classes.information_container}>
                    <div className={classes.left}>
                        <div className={classes.basic_information}>
                            <div className={classes.basic_information_title}><span className={classes.title}>Basic Information</span> <Link href="/settings"><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Birthday:</span><span className={classes.value}>{user.birthdate}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Gender:</span><span className={classes.value}>{user.gender}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Phone:</span><span className={classes.value}>{user.phone}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Email:</span><span className={classes.value}>{user.email}</span></div>
                        </div>
                        <div className={classes.myservices}>
                            <div className={classes.basic_information_title}><span className={classes.title}>My Services</span> <Link href="/settings"><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link></div>
                            <div className={classes.my_services_container}>
                                {user.my_services.map((service, index) => {
                                    return <div className={classes.service_item} key={index}>{service}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.myservices}>
                            <div className={classes.basic_information_title}><span className={classes.title}>I'd love to sit </span> <Link href="/settings"><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link></div>
                            <div className={classes.my_services_container}>
                                {user.my_services.map((service, index) => {
                                    return <div className={classes.service_item} key={index}>{service}</div>
                                })}
                            </div>
                        </div>
                        <div className={classes.myservices}>
                            <div className={classes.basic_information_title}><span className={classes.title}>I work in </span> <Link href="/settings"><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link></div>
                            <div className={classes.my_services_container}>
                                {user.my_services.map((service, index) => {
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
                        <div className={classes.p_i}>
                        <Image src={"https://static.wikia.nocookie.net/jorjorswackyjourney/images/3/30/Rihqw92yzpoypx8azfvc.png/revision/latest?cb=20180715145752"} layout='fill' />
                        </div>
                    </div>
                    <div className={classes.priority_information}>
                        <div className={classes.priority_row_1}>
                            <div className={classes.name}>{user.name} {user.surname}</div>
                            <div className={classes.location}><LocationSVG className={classes.loc} /> {user.city}</div>
                            <Link href="/settings"><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link>
                        </div>
                        <div className={classes.priority_row_2}>
                            {capitalizeFirstLetter(user.role)}
                        </div>
                        <div className={classes.sep}>
                <div className={classes.basic_information}>
                            <div className={classes.basic_information_title}><span className={classes.title}>Basic Information</span> <Link href="/settings"><div className={classes.edit}>Edit <Pen className={classes.pen} /></div></Link></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Birthday:</span><span className={classes.value}>{user.birthdate}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Gender:</span><span className={classes.value}>{user.gender}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Phone:</span><span className={classes.value}>{user.phone}</span></div>
                            <div className={classes.basic_information_item}><span className={classes.attribute}>Email:</span><span className={classes.value}>{user.email}</span></div>
                        </div>
                        </div>
                    </div>

                </div>

            </main>}
        </div>
        <Footer Name={session?.user?.firstName} Surname={session?.user?.lastName} Message="" />
        </>
    );
}

export default MyProfile;