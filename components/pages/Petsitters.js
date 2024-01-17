import React, { useState, useEffect, useRef } from 'react';
import classes from './Petsitters.module.css';
import MultipleDropdown from './functionals/MultipleDropdown';
import services from '../data/services';
import SitterCard from './functionals/SitterCard';
import Header from '../ui/Header';
import { useSession } from 'next-auth/react';

function Petsitters() {
  const {data: session} = useSession({required: false});
    const [petsitters, setPetsitters] = useState([
        {
          user_id: 0,
          profileImage: '',
          firstName: '',
          lastName: '',
          birthday: '',
          city: '',
          rating: 1,
          about_me: '',
        },
      ]);

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(session?.user?.country || "Austria");
  const [cities, setCities] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleServicesChange = (services) => {
    setSelectedServices(services);
  };

  const handleCitiesChange = (cities) => {
    setSelectedCities(cities);
  };

  useEffect(() => {
    // Städte für das festgelegte Land ("Albania") laden
    const fetchCities = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: selectedCountry }),
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
  }, [selectedCountry]);

  const handleRemoveCity = (removedCity) => {
    const updatedCities = selectedCities.filter((city) => city !== removedCity);
    setSelectedCities(updatedCities);
  };

  const [search, setSearch] = useState('');
  const chunkSize = 3;

  // Initial geladene Karten
  const [displayedPetsitters, setDisplayedPetsitters] = useState([]);
  // Index, um den nächsten Satz von Karten zu verfolgen
  const [startIndex, setStartIndex] = useState(0);
  const loadMoreButtonRef = useRef(null);
  useEffect(() => {
    // Filtern Sie die Petsitter basierend auf dem Suchbegriff
    const filteredPetsitters = petsitters.filter((sitter) => {
      const fullName = `${sitter.firstName} ${sitter.lastName}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });

    // Berechnen Sie die Anzahl der anzuzeigenden Karten
    const endIndex = Math.min(startIndex + chunkSize, filteredPetsitters.length);
    setDisplayedPetsitters((prev) => [...prev, ...filteredPetsitters.slice(startIndex, endIndex)]);
  }, [search, petsitters, startIndex]);

  // Lade mehr Karten, wenn der "Load More"-Button auf dem Bildschirm sichtbar ist

  const handleLoadMore = () => {
    setStartIndex((prev) => prev + chunkSize);
  };


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Wann die Intersection erfolgen soll, 0 bis 1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      });
    }, options);

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }

    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [loadMoreButtonRef, handleLoadMore]);

  

  // Überprüfen Sie, ob es noch mehr Karten zum Laden gibt
  const hasMorePetsitters = displayedPetsitters.length < petsitters.length;

// Funktion, um die angezeigten Petsitter zu aktualisieren
const updateDisplayedPetsitters = (filteredPetsitters) => {
  const endIndex = Math.min(startIndex + chunkSize, filteredPetsitters.length);
  setDisplayedPetsitters((prev) => [...prev, ...filteredPetsitters.slice(startIndex, endIndex)]);
};

useEffect(() => {
  const filteredPetsitters = petsitters.filter((sitter) => {
    const fullName = `${sitter.firstName} ${sitter.lastName}`.toLowerCase();
    const searchQuery = search.toLowerCase();

    if (fullName.startsWith(searchQuery)) {
      return true;
    }

    return fullName.includes(searchQuery);
  });

  // Setzen Sie die angezeigten Petsitters neu, wenn sich der Suchbegriff ändert
  setDisplayedPetsitters(filteredPetsitters.slice(0, chunkSize));
  // Setzen Sie den Startindex zurück, um von vorne zu beginnen
  setStartIndex(chunkSize);
}, [search, petsitters]);

useEffect(() => {
  // Wenn keine Städte ausgewählt wurden, zeige alle Petsitters
  if (selectedCities.length === 0) {
    setShowErrorMessage(false);
    setDisplayedPetsitters(petsitters.slice(0, chunkSize));
    setStartIndex(chunkSize);
    return;  // Verlasse den Effekt, um weitere Updates zu verhindern
  }

  const filteredPetsitters = petsitters.filter((sitter) => {
    return selectedCities.includes(sitter.city);
  });

  // Setze die Fehlermeldung, wenn keine Petsitter gefunden wurden
  setShowErrorMessage(filteredPetsitters.length === 0);

  // Setze die angezeigten Petsitters neu, wenn sich die ausgewählten Städte ändern
  setDisplayedPetsitters(filteredPetsitters.slice(0, chunkSize));
  // Setze den Startindex zurück, um von vorne zu beginnen
  setStartIndex(chunkSize);
}, [selectedCities, petsitters]);
useEffect(() => {
  const fetchData = async() => {
    try {
      const res = await fetch("/api/getpt", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      console.log(data);
      const mappedPetsitters = data.map(user => ({
        user_id: user._id,
        profileImage: user.image,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        birthday: user.birthDate || '',
        rating: 3,
        city: user.city || '',
        about_me: user.description, // Adjust as needed
      }));
  
      // Update the state with the mapped petsitters
      setPetsitters(mappedPetsitters);
    }
    catch(err) {
      console.log(err);
    }
  }
  fetchData();
}, []);
  return (
    <>
    <Header 
    signedIn={session?.user}
    Name={session?.user?.firstName}
    Surname={session?.user?.lastName}
    profilePic={session?.user?.image}
    />
    <div className={classes.container}>
      <main className={classes.main}>
        <div className={classes.filter_container}>
          <MultipleDropdown
            label="Select Cities"
            options={cities}
            selectedOptions={selectedCities}
            onOptionsChange={handleCitiesChange}
          />
          <div className={classes._seperator}></div>
          <div className={classes.ad_placeholder_portrait_format}>
            Ad Placeholder
          </div>
        </div>
        <div className={classes.results_container}>
        <div className={classes.filter}>
  <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search by name' className={classes.input} />
</div>

{showErrorMessage ? (
  <div className={classes.error_message}>
    No petsitters found in the selected city.
  </div>
) : (
  <>
    {displayedPetsitters.map((sitter) => (
      <SitterCard
        key={sitter.user_id}
        user_id={sitter.user_id}
        profileImage={sitter.profileImage}
        firstName={sitter.firstName}
        lastName={sitter.lastName}
        birthday={sitter.birthday}
        city={sitter.city}
        rating={sitter.rating}
        about_me={sitter.about_me}
      />
    ))}
    <div ref={loadMoreButtonRef}>
      {/* Platzhalter für "Load More"-Button, kann auch ein unsichtbares div sein */}
    </div>
    {hasMorePetsitters && (
      <button onClick={handleLoadMore} style={{ display: 'none' }}>Load More</button>
    )}
  </>
)}
        </div>
      </main>
    </div>
    </>
  );

}

export default Petsitters;
