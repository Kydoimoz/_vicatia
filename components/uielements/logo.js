import Image from "next/image";
import logopng from './../../public/images/logo.png'
function Logo(){
    return (
        <Image src={logopng} alt="Logo" />
    )
} export default Logo;