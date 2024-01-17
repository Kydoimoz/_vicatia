import Link from 'next/link';
import classes from './SitterCard.module.css'
import Image from 'next/image';
import LocationSVG from './../../../public/svg/location.svg';
import DisplayRating from './DisplayRating';

function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Überprüfen, ob der Geburtstag bereits stattgefunden hat
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
  
    return age;
}

function SitterCard({ user_id, profileImage, firstName, lastName, birthday, city, rating, about_me }){
    
    const age = calculateAge(birthday);
    const truncatedAboutMe = about_me.slice(0, 100);

    return (
        <Link href={`/profile/${user_id}`}>
            <div className={classes.container}>
                <div className={classes.image_container}>
                    <Image src={`${profileImage}`} objectFit='cover' layout='fill' draggable='false' alt='Profile Image' loading='eager' priority />
                </div>
                <div className={classes.information_container}>
                    <div className={classes.row_1}><span className={classes.name}>{firstName + " " + lastName}</span><span className={classes.age}>- {age}y</span><span className={classes.city}><LocationSVG />{city}</span></div>
                    <div className={classes.hidden_row}><span className={classes.hidden_age}>- {age}y</span><span className={classes.hidden_city}><LocationSVG />{city}</span></div>
                    <div className={classes.row_2}>
                        <DisplayRating rating={rating} />
                    </div>
                    <div className={classes.row_3}>About me</div>
                    <div className={classes.row_4}>
                        {truncatedAboutMe}{about_me.length > 200 && '...'}
                    </div>
                </div>

            </div>
        </Link>
    )
} export default SitterCard;