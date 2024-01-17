import classes from './PetCard.module.css';
import Image from 'next/image';
function PetCard({ name, needs, about, image }){

    return( 
    <div className={classes.container}>
        <div className={classes.image_container}>
            <Image src={image} objectFit='cover' layout='fill' draggable='false' alt='Profile Image' loading='eager' priority />
        </div>
        <div className={classes.information_container}>
            <div className={classes.row_1}><span className={classes.name}>{name}</span></div>
            <div className={classes.needs}>
                <span className={classes.needs_title}>Needs: </span>
                {needs.map((need, index) => {
                    return <span className={classes.need}>{need}</span>
                })}
            </div>
            <div className={classes.row_3}>About {name}</div>
            <div className={classes.row_4}>
                {about}
            </div>
        </div>
    </div>
)
} export default PetCard;