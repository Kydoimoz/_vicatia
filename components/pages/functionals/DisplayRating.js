import React, { useState, useEffect } from 'react';
import classes from './DisplayRating.module.css';

const DisplayRating = ({ rating }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Führe die Animation bei der ersten Anzeige durch
    setAnimated(true);
  }, []);

  const stars = Array.from({ length: 5 }, (_, index) => {
    let starClass = classes.star;

    if (animated) {
      // Füge die Klasse für die Farbänderungsanimation hinzu
      starClass += ` ${classes.animateColor}`;
    }

    if (index < Math.floor(rating)) {
      // Dieser Stern ist voll gefüllt
      return <span key={index} className={`${starClass} ${classes.filled}`}>&#9733;</span>;
    }  else {
      // Dieser Stern ist leer
      return <span key={index} className={`${starClass} ${classes.empty}`}>&#9734;</span>;
    }
  });

  return <div className={classes.container}>{stars} <span className={classes.rating}>{rating}</span></div>;
};

export default DisplayRating;
