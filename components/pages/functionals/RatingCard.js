import DisplayRating from "./DisplayRating";
import classes from './RatingCard.module.css';
import Image from "next/image";
function RatingCard({ rating, name, image, title, description}){
    return (
        <div className={classes.container}>
        <div className={classes.image_container}>
            <Image src={image} objectFit='cover' layout='fill' draggable='false' alt='Profile Image' loading='eager' priority />
        </div>
        <div className={classes.information_container}>
            <div className={classes.row_1}><span className={classes.name}>{name}</span></div>
            <div className={classes.needs}>
                <span className={classes.needs_title}><span className={classes.rating_title}>Rating:</span> <DisplayRating rating={rating} /></span>

            </div>
            <div className={classes.row_3}>{title}</div>
            <div className={classes.row_4}>
                {description}
            </div>
        </div>
    </div>
    )
} export default RatingCard;