import { useRouter } from "next/router";
import { useEffect } from "react";
function RedirectingPage(){
    const router = useRouter();
    useEffect(() => {
        router.replace("/home")
    })
} export default RedirectingPage;