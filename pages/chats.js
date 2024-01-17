import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { data: session, status } = useSession({ required: false });
  const { username, secret, setUsername, setSecret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);

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
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      const { email } = session.user;
      setUsername(email);
      setSecret("Admin123!");
      const sessiondata = {
        id: session.user._id,
        firstname: session.user.firstName,
        lastname: session.user.lastName,
        email: email,
      };
      sessionStorage.setItem("user", JSON.stringify(sessiondata));
    }
  }, [session, setUsername, setSecret]);

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('user'));
    if (storedUserData) {
      setUsername(storedUserData.email);
      setSecret("Admin123!");
    }
  }, []);

  if (!showChat) return <div></div>;
  return (
    <>
                <Header
        signedIn={session?.user}
        profilePic={session?.user?.image}
        Name={session?.user?.firstName}
        Surname={session?.user?.lastName}
      />
    <div className="background">
    


      
    </div>
    <Footer Name={session?.user?.firstName} Surname={session?.user?.lastName} Message="(Sign Out)" />
    </>
  );
}
