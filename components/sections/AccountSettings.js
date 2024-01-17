import { useState } from 'react';
import classes from './AccountSettings.module.css'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { userAccount } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/react';
import DeleteAccountModal from './delAccount';
import PasswordModal from './PasswordModal';
import { Router, useRouter } from 'next/router';
import bcrypt from "bcryptjs";
import User from "../../models/dbschema";


function AccountSettings({}) {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    if(typeof window !== 'undefined'){
        const newUrl = `/settings?query=${session?.user?.id}`;
        window.history.replaceState(null, '', newUrl);
    }

    const router = useRouter();

    const [isOpen, setOpen] = useState(false);
    const [secisOpen, setSecIsOpen] = useState(false);
    const handleSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/props/number`, {
                cache: 'no-store',
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ u_phoneNumber: currentTel, _id: session?.user?.id }), // Update the key to match your server-side expectation

            });
            // console.log(u_phoneNumber);
            if (!res.ok) {
                throw new Error("Failed to fetch..");
            }

            const data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            console.error(err);
        }
    }
    const change_mail = async() => {

        try{
            const r = await fetch(`http://localhost:3000/api/props/cMail`, {
                cache: 'no-store',
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ n_email: currentEmail, _id: session?.user?.id, password: session?.user?.password }), // Update the key to match your server-side expectation

            });
            const dart = await r.json();
            console.log(dart);
            if (!r.ok) {
                throw new Error("Failed to fetch..");
            }
        }
        catch(err) {
            console.log(err);
        }

       router.reload();
    }
    


    const delete_account = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/props/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({ _id: session?.user?.id }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch...");
            }
            const getdeletedData = await response.json();
            console.log("Data to delete: ", getdeletedData);
            return getdeletedData;
        }


        catch (err) {
            console.error("Error: ", err);
        }
    }

    const handleDelete = async () => {
        try {
          const deletedData = await delete_account(session?.user?.id);
          console.log("Response from server:", deletedData);
      
          // Überprüfe, ob die Löschung erfolgreich war
          if (deletedData?.message === "User deleted successfully") {
            // Führe hier die gewünschten Aktionen aus, z.B. Logout oder Weiterleitung
            console.log("Account erfolgreich gelöscht");
          } else {
            console.error("Fehler beim Löschen des Kontos");
          }
        } catch (error) {
          console.error("Fehler beim Löschen des Kontos:", error);
        }
      };

    

    const closeModal = () => {
        setSecIsOpen(false);
    }
    const confirmChange = () => {
        console.log("Email changed...");
        change_mail();
        closeModal();
    }
    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log('Account deleted!');
        delete_account(session?.user?.id);
        handleCloseModal();
    };
    /* const [userData, setUserData] = useState(null);
     
     
     useEffect(() => {
         const fetchUserData = async () => {
             try {
                 const response = await fetch('/api/posts');
                 const data = await response.json();
                 setUserData(data);
             } catch (error) {
                 console.error('Error fetching user data:', error);
             }
         };
     
         if (session) {
             fetchUserData();
         }
     }, [session]);
    */
    console.log((session?.user));


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

    const [user, setUser] = useState({
        phone_number: session?.user.phoneNumber,
        email: session?.user.email,
        password: session?.user.password,
    })

    const [currentTel, setCurrentTel] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    function handleTelChange(e) {
        setCurrentTel(e.target.value);
    }

    function handleEmailChange(e) {
        setCurrentEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setCurrentPassword(e.target.value)
    }

    function handleNewPasswordChange(e){
        setNewPassword(e.target.value);
    }

    function handleConfirmPasswordChange(e){
        setConfirmPassword(e.target.value)
    }

    async function handlePasswordChanger(e){
        e.preventDefault();
        try {
            if (newPassword !== confirmPassword) {
                console.error('New password and confirm password do not match');
                return;
              }
          
              try {
                const response = await fetch('/api/props/apssw', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    _id: session?.user?._id
                  }),
                });
          
                if (response.ok) {
                  const result = await response.json();
                  console.log(result.message); // Success message
                } else {
                  const error = await response.json();
                  console.error('Password change failed:', error.error);
                }
              } catch (error) {
                console.error('Error:', error);
              }
            
        }
        catch(err) {
            console.error("Error ", err);
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.title}>Account Settings</div>
            <div className={classes.section}>
                <div className={classes.section_desc}>Current Phone nr.</div>
                <div className={classes.phone_number}>{session?.user.phoneNumber}</div>
                <form onSubmit={handleSubmit}>
                    <div className={classes.changer_container}>
                        <label className={classes.label}>New Phone nr.</label>
                        <div className={classes.changer}>
                            <input
                                type="tel"
                                className={classes.input}
                                id={`tel`}
                                name={`tel`}
                                value={currentTel}
                                onChange={handleTelChange}
                                required
                            />
                            <button type='submit'>  <div className={classes.save_changes}>Save changes</div></button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.section}>
                <div className={classes.section_desc}>Current email</div>
                <div className={classes.phone_number}>{session?.user.email}</div>
                <div className={classes.changer_container}>
                    <label className={classes.label}>New email.</label>
                    <form onSubmit={change_mail}>
                    <div className={classes.changer}>
                        <input
                            type="email"
                            className={classes.input}
                            id={`email`}
                            name={`email`}
                            value={currentEmail}
                            onChange={handleEmailChange}
                            required
                        />
                        <button type="submit">
                        <div className={classes.save_changes} /*onClick={/*() => setSecIsOpen(true) }*/>Save changes</div>
                        </button>
                        {/*secisOpen && (
                            <PasswordModal onClose={closeModal} onConfirm={confirmChange}/>
                        )
                        */}
                        
                    </div>
                    </form>
                </div>
            </div>
            <form onSubmit={handlePasswordChanger} className={classes.section}>
                <div className={classes.changer_container}>
                    <label className={classes.label}>Current password</label>
                    <input
                        type="password"
                        className={classes.input}
                        id={`passsword`}
                        name={`password`}
                        value={currentPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className={classes.changer_container}>
                    <label className={classes.label}>New password</label>
                    <input
                        type="password"
                        className={classes.input}
                        id={`passsword`}
                        name={`password`}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                </div>
                <div className={classes.changer_container}>
                    <label className={classes.label}>Confirm new password</label>
                    <div className={classes.changer}>
                        <input
                            type="password"
                            className={classes.input}
                            id={`password`}
                            name={`password`}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        <div className={classes.save_changes}>Save changes</div>
                    </div>
                </div>
            </form>

                <div className={classes.delete_acc} onClick={handleOpenModal}>Delete Account</div>
                {isOpen && (
                    <DeleteAccountModal
                        onClose={handleCloseModal}
                        onConfirm={handleDelete}
                    />
                )}
       
            <div className={classes.save_button}>Finish</div>
        </div>
    )
}
export default AccountSettings;