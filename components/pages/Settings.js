import React, { useState, useEffect, use } from "react";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import classes from "./Settings.module.css";
import MultipleDropdown from "./functionals/MultipleDropdown";
import AccountSettings from "../sections/AccountSettings";
import { useSession } from "next-auth/react";
import ExamplePic from "../../public/images/paw.png";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";



function Settings({ /*userSession, userData*/ }) {
  const router = useRouter();
  const { data: session, loading } = useSession();

useEffect(() => {
  if (!loading) {
    if (session) {
      console.log("Session: ", session.user?.id);
    } else {
      console.log("Session geht nicht");
      // Hier kannst du weitergehende Aktionen ausführen, z.B. Redirect
    }
  }
}, [session, loading]);


  const [cities, setCities] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionCheck = await getSession();
        if (!sessionCheck) {
          router.replace("/login");
        }
      } catch (err) {
        console.error('Error checking session:', err);
      }
    };

    checkSession();
  }, []);

  const isOwner = session?.user?.role == "petowner" ? true : false; // true => user is a pet owner, false => user is a pet sitter
  const [petowner, setPetowner] = useState({
    amountPets: 0,
    about: "",
    mypets: [],
  });

  const [userPreferences, setUserPreferences] = useState({
    offeredServices: [],
    workableCities: [] ,
    suitablePets: [],
    about_me: "",
  });

  useEffect(() => {
    if(session){
      setUserPreferences({
        offeredServices: session?.user?.services,
        workableCities: session?.user?.workplaces,
        suitablePets: session?.user?.pets_sit,
        about_me: session?.user?.description
      })
    } else {
      console.log("Session geht nicht")
    }
  }, [session])

  useEffect(() => {
    if(!session?.user){
      router.replace("/login")
    }
  }, [])

  const [allCities, setAllCities] = useState(cities);
  const [allPets, setAllPets] = useState([  
    "Dog",
  "Cat",
  "Bird",
  "Fish",
  "Rabbit",
  "Hamster",
  "Guinea Pig",
  "Snake",
  "Turtle",
  "Lizard",
  "Ferret",
  "Horse",
  "Reptile",
  "Amphibian",
  "Small Mammal",
  "Exotic Pets",]); // Replace with actual pet data
  const [allServices, setAllServices] = useState([
    "Dog Walking",
    "Pet Sitting",
    "Pet Boarding",
    "Pet Grooming",
    "Veterinary Care",
    "Pet Training",
    "Pet Feeding",
    "Pet Transportation",
    "Pet Photography",
  ]);

  const handleServicesChange = (selectedServices) => {
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      offeredServices: selectedServices,
    }));
  };

  useEffect(() => {
    console.log(userPreferences.offeredServices)
  }, [userPreferences.offeredServices])

  const handleAmountPetsChange = (event) => {
    const amountPetsValue = event.target.value;
    setPetowner({
      ...petowner,
      amountPets: amountPetsValue,
      mypets: Array.from({ length: amountPetsValue }, (_, index) => petowner.mypets[index] || {
        name: "",
        birthday: "",
        neededServices: [],
        about: ""
      })
    });
  };

  const handlePetChange = (index, field, value) => {
    setPetowner((prev) => ({
      ...prev,
      mypets: prev.mypets.map((pet, i) =>
        i === index ? { ...pet, [field]: value } : pet
      ),
    }));
  };

  const handleAboutChange = (value) => {
    setPetowner((prev) => ({
      ...prev,
      about: value,
    }));
  };

  const handleAbout = (value) => {
    setUserPreferences((prev) => ({
      ...prev,
      about_me: value,
    }))
  }

  useEffect(() => {

    const fetchCities = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: "Austria" }),
        });

        const data = await response.json();
        // Annahme: Die API gibt die Städte im Datenfeld "data" zurück
        const cities = data.data;
        setCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  async function handleSubmitPetsitter(e) {
    try {
      console.log(userPreferences);
      const res = await fetch("/api/props/allin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: session?.user?.id, // id copied from database previous code: session?.user?._id
          services: userPreferences.offeredServices, // Add your service values
          pets_sit: userPreferences.suitablePets, // Add your pet values
          workplaces: userPreferences.workableCities, // Add your workplace values
          description: userPreferences.about_me
        }),
      });
      const data = await res.json();
      console.log("Data: ", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
     /* const res = await fetch("/api/props/desc", {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({n_desc: userPreferences.about_me, _id: session?.user?._id}),
      });
      const data = await res.json();
      console.log("Data: ", data);

      const resp = await fetch("/api/props/services", {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({n_servicees: userPreferences.offeredServices, _id: session?.user?._id}),
      });
      const daten = await resp.json();
      console.log("Data: ", daten);

      const resw = await fetch("/api/suitable/", {
        cache: "no-store", 
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({n_pets_sit: userPreferences.suitablePets, _id: session?.user?._id}),
      });
      const datas = await resw.json();
      console.log("Data: ", datas);

      const resww = await fetch("/api/workplaces", {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({n_workplaces: userPreferences.workableCities, _id: session?.user?._id}),
      });
      const r = await resww.json();
      console.log("Data ", r);*/
    


  

  function handleSubmitPetowner(e){
    e.preventDefault();
    console.log(petowner)
  }

  return (
    <div>
      <Header
        signedIn={session?.user}
        profilePic={session?.user?.image}
        Name={session?.user?.firstName}
        Surname={session?.user?.lastName}
      />
      <main className={classes.main}>
        {isOwner == false ? (
          <div className={classes.p_container}>
            <div className={classes.page_title}>
              Please give information about your services for the most
              qualitative matchmaking
            </div>
            <form className={classes.p_content} onSubmit={handleSubmitPetsitter}>
              <div className={classes.p_column_1}>
                <MultipleDropdown
                  label="Select workable cities"
                  options={cities}
                  selectedOptions={userPreferences.workableCities || []}
                  onOptionsChange={(selectedOptions) =>
                    setUserPreferences((prevPreferences) => ({
                      ...prevPreferences,
                      workableCities: selectedOptions,
                    }))
                  }
                />
                <MultipleDropdown
                  label="Select suitable pets"
                  options={allPets}
                  selectedOptions={userPreferences.suitablePets || []}
                  onOptionsChange={(selectedOptions) =>
                    setUserPreferences((prevPreferences) => ({
                      ...prevPreferences,
                      suitablePets: selectedOptions,
                    }))
                  }
                />
                <MultipleDropdown
                  label="Select offered services"
                  options={allServices}
                  selectedOptions={userPreferences.offeredServices || []}
                  onOptionsChange={handleServicesChange}
                />
                            <div className={classes.aboutme_textarea}>
              <label className={classes.pet_label}>About me</label>
              <textarea
                value={userPreferences.about_me}
                className={classes.pet_textarea}
                onChange={(e) => handleAbout(e.target.value)}
              />
            </div>
                <button type="submit" className={classes.save_button}>SAVE</button>
              </div>
            </form>
          </div>
        ) : (
          <div className={classes.p_container}>
            <div className={classes.page_title}>
              Introduce your pets to achieve maximum matchmaking quality
            </div>
          </div>
        )}

        <AccountSettings />
      </main>
      <Footer Name={session?.user?.firstName} Surname={session?.user?.lastName} />
    </div>
  );
}

export default Settings;