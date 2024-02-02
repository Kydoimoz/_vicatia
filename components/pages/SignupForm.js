import classes from './SignupForm.module.css'
import Logo from './../../public/images/logo.png'
import Paw from './../../public/images/paw.png'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useContext } from 'react'
import { Context } from '../../context'

function SignupForm() {

    const {
        username,
        setUsername,
        secret,
        setSecret,
      } = useContext(Context);

    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        birth_date: new Date(),
        gender: "",
        country: "",
        city: "",
        password: "",
        confirmpassword: "",
        isPetowner: undefined,
        role: "",
        newsletter: true,
    })
    useEffect(() => {
        console.log(state);
    });

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [successMessage, setSuccessMessage] = useState('');

    const router = useRouter();
    const { pathname, query } = router;

    console.log('Current Path:', pathname);
    console.log('Current Query Parameters:', query);


    async function onSubmit(e) {
        e.preventDefault();
        const formData = {};
        Array.from(e.currentTarget.elements).forEach(f => {
            if (!f.name) return;
            formData[f.name] = f.value;
        });
        console.log(formData);
        const keys = Object.keys(state);
        for (const key of keys) {
            if (state[key] === "") {
                setError("All fields are required!");
                return;
            }
        }
        try {
            const response = await fetch("/api/signup/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: state.firstname,
                    lastName: state.lastname,
                    email: state.email,
                    phoneNumber: state.phonenumber,
                    gender: state.gender,
                    country: state.country,
                    city: state.city,
                    newsletter: state.newsletter,
                    role: state.role,
                    birthDate: state.birth_date,
                    password: state.password,
                }),
            });

            if (response.ok) {
                // Check if the response contains valid JSON
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const res = await response.json();
                    console.log(res);
                } else {
                    console.error('Error: Response is not JSON');
                }
                axios.put(
                    'https://api.chatengine.io/users/',
                    {username, secret},
                    {headers: {"Private-key": "e4fbbfc3-6a22-41d6-9ed3-4ed0f90baec8"}}
                  )
                const form = e.target;
                form.reset();
                setSuccessMessage('Check your mail-inbox for user verification');
            } else {
                console.error("Error:", response.status, response.statusText);
            }

            //-- check if user exits in the DB
            const userlogged = await fetch("/api/logincheck/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
                //  credentials: "include",
            });
            const { storeData } = await userlogged.json();
            console.log(storeData);
            if (storeData) {
                console.log("User already exists..");
                setError("User already exists...");
                return;
            }
        } catch (err) {
            console.error(err);
        }
        /* const res = await fetch("signup/api/register/", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({ firstName: state.firstname, lastName: state.lastname, email: state.email, phoneNumber: state.phonenumber, gender: state.gender, country: state.country, city: state.city, newsletter: state.newsletter, birthDate: state.birth_date, password: state.password }),
         });
         console.log(res.data);
         const form = e.target;
         form.reset();
         router.push("/");*/
        // Wenn erfolgreich, Weiterleitung zur Profilseite des Benutzers

        // Serverseitige Überprüfung für den Alter notwendig (14 oder älter)


    }



    // Diese Funktion wird aufgerufen, wenn Veränderungen in den Inputs passieren (außer in Country & City)
    const handleChange = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    const handleChangeEmail = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });
        setUsername(value);
    }

    const handleChangePassword = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        });

        setSecret("Admin123!");
    }




    const handleCheckChange = (event) => {
        const { name, checked } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
        console.log(state.newsletter)
    };

    /* 
        Diese Funktion ladet alle Länder und ermittelt automatisch den Standort des Benutzers,
        wodurch wir seinen aktuellen Land und Stadt bekommen und die Felder automatisch befüllen können.
    */
    useEffect(() => {
        // Länder laden
        fetch('https://countriesnow.space/api/v0.1/countries/iso')
            .then(response => response.json())
            .then(data => {
                // Setze die Länder im State
                setCountries(data.data);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);



    // In der handleCountryChange-Funktion
    const handleCountryChange = async (e) => {
        const value = e.target.value;
        setSelectedCountry(value);

        setState(prevState => ({
            ...prevState,
            country: value,
        }));

        try {
            // Städte für das ausgewählte Land laden
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country: value }), // Hier wird jetzt der korrekte Wert verwendet
            });

            const data = await response.json();

            // Setze die Städte im State
            setCities(data.data);

            // Setze ausgewählte Stadt zurück, da sich das Land geändert hat
            setSelectedCity('');
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    // In der handleCityChange-Funktion
    const handleCityChange = (e) => {
        const value = e.target.value;

        setSelectedCity(value);

        setState(prevState => ({
            ...prevState,
            city: value,
        }));

        console.log(state);
    };

    const calculateMinDate = () => {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() - 14);

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    function handleIsOwner(b) {
        setState(prevState => ({
            ...prevState,
            role: b == true ? "petowner" : "petsitter",
            isPetowner: true,
        }));
    }

    function handleGenderChange(e) {
        setSelectedGender(e.target.value);
        setState(prevState => ({
            ...prevState,
            gender: e.target.value
        }))
    }

    return (
        <div className={classes.container}>
            <div className={classes.logo}>
                <Link href={"/"}><Image src={Logo} draggable="false" alt='Logo' /></Link>
            </div>
            <div className={classes.left}>
                <div className={classes.heading}>Welcome Page</div>
                <div className={classes.description}>Sign up to<br></br>continue access</div>
                <div className={classes.paw}>
                    <Image src={Paw} alt='Paw Icon' />
                </div>
            </div>
            <div className={classes.right}>
                {state.isPetowner !== undefined ? <><div className={classes.signupas}><span>Signup</span></div>
                    <form onSubmit={onSubmit} className={classes.form}>
                        <div className={classes.relative}>
                            <input
                                type='text'
                                name='firstname'
                                value={state.firstname}
                                onChange={handleChange}
                                className={classes.input}
                                placeholder='Name'
                                required
                                maxLength={20}
                            />

                        </div>
                        <div className={classes.relative}>
                            <input
                                type='text'
                                name='lastname'
                                value={state.lastname}
                                onChange={handleChange}
                                className={classes.input}
                                placeholder='Surname'
                                required
                                maxLength={20}
                            />

                        </div>
                        <div className={classes.relative}>
                            <select id="gender" name='gender' value={selectedGender} className={classes.selectinput} onChange={handleGenderChange} required>
                                <option value="" disabled className={classes.option}>Select your gender</option>
                                <option className={classes.option}>Male</option>
                                <option className={classes.option}>Female</option>
                            </select>
                        </div>
                        <div className={classes.relative}>
                            <input
                                type='email'
                                name='email'
                                value={state.email}
                                onChange={handleChangeEmail}
                                className={classes.input}
                                placeholder='Email'
                                required
                                maxLength={35}
                            />

                        </div>
                        <div className={classes.relative}>
                            <input
                                type='number'
                                name='phonenumber'
                                value={state.phonenumber}
                                onChange={handleChange}
                                className={classes.input}
                                placeholder='Phone number'
                                required
                                maxLength={17}

                            />
                        </div>
                        <div className={classes.relative}>
                            <input
                                type='date'
                                name='birth_date'
                                value={state.birth_date}
                                onChange={handleChange}
                                className={classes.input}
                                placeholder='Birth date'
                                max={calculateMinDate()}
                                required

                            />
                        </div>
                        <div className={classes.relative}>
                            <select id="country" name='country' value={selectedCountry} className={classes.selectinput} onChange={handleCountryChange} required>
                                <option value="" disabled className={classes.option}>Country</option>
                                {countries.map((country, index) => (
                                    <option className={classes.option} key={index} value={country.iso2}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={classes.relative}>
                            <select id="city" name='city' value={selectedCity} className={classes.selectinput} onChange={handleCityChange} required>
                                <option value="" disabled className={classes.option}>City</option>
                                {cities.map((city, index) => (
                                    <option className={classes.option} key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={classes.relative}>
                            <input
                                type='password'
                                minLength={7}
                                name='password'
                                value={state.password}
                                onChange={handleChangePassword}
                                className={classes.input}
                                placeholder='Create password'
                                required
                            />

                        </div>
                        <div className={classes.relative}>
                            <input
                                type='password'
                                name='confirmpassword'
                                value={state.confirmpassword}
                                onChange={handleChange}
                                className={classes.input}
                                placeholder='Confirm password'
                                required
                            />
                        </div>
                        <div className={classes.relative && classes.check}>
                            <input type='checkbox' className={classes.checkbox} checked={state.newsletter} name='newsletter' onChange={handleCheckChange} value={state.newsletter}></input>
                            <label className={classes.label}>I would like to receive promotional codes and discounts from the newsletter</label>
                        </div>
                        <div className={classes.relative}>
                            <p>By creating an account, you acknowledge and agree to our <Link href={"/terms-of-service"}><span className={classes.link}>terms of service</span></Link>, and you have read and accepted the <Link href={"/global-privacy-policy"}><span className={classes.link}>Global Privacy Policy.</span></Link></p>
                        </div>
                        <div className={classes.error}>{state.password != state.confirmpassword && "The passwords don't match"}</div>
                        {error && (
                            <div className={classes.error_message}>
                                {error}
                            </div>
                        )}
                        <button className={classes.button} disabled={state.password != state.confirmpassword} type='submit'>Signup</button>
                    </form>
                    <>
                        {successMessage && (
                            <div className={classes.successMessage}>
                                {successMessage}
                            </div>
                        )}
                    </>
                    <div className={classes.existingacc}>Already have an account? <Link href={"/login"}><span className={classes.underline}>Login</span></Link></div></> :
                    <>

                        <div className={classes.c_right}>
                            <div className={classes.c_signupas}><span>Sign up</span><span>as</span></div>
                            <div className={classes.c_button} onClick={() => handleIsOwner(true)}>Pet Owner</div>
                            <div className={classes.c_or}>OR</div>
                            <div className={classes.c_button} onClick={() => handleIsOwner(false)}>Pet Sitter</div>
                            <div className={classes.c_existingacc}>Already have an account? <Link href={"/login"}><span className={classes.c_underline}>Login</span></Link></div>
                        </div>
                    </>}
            </div>

        </div>
    )
} export default SignupForm;