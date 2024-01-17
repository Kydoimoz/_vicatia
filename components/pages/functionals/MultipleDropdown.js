import React, { useState, useEffect } from "react";
import classes from './MultipleDropdown.module.css';
import X from '../../../public/svg/x.svg';
const MultipleDropdown = ({ label, options, selectedOptions, onOptionsChange }) => {
    
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = () => {
    if (selectedOption && !selectedOptions.includes(selectedOption)) {
      const updatedOptions = [...selectedOptions, selectedOption];
      onOptionsChange(updatedOptions);
      setSelectedOption("");
    }
  };

  const handleRemoveOption = (removedOption) => {
    const updatedOptions = selectedOptions.filter((option) => option !== removedOption);
    onOptionsChange(updatedOptions);
  };

  useEffect(() => {
    // Wenn alle Optionen ausgewählt wurden, setze die ausgewählte Option zurück
    if (selectedOptions.length === options.length) {
      setSelectedOption("");
    }
  }, [selectedOptions, options]);

  return (
    <div>
      <div className={classes.dropdown_container}>
        <label className={classes.label}>{label}</label>
        <select
          className={classes.selectinput}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          onClick={() => handleOptionSelect()} // Füge den Aufruf der Funktion hinzu
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          {options.filter((option) => !selectedOptions.includes(option))
            .map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
      <div className={classes.selected_items}>
        {selectedOptions.map((selectedOption, index) => (
          <div key={index} className="selected-option">
            <div className={classes.selected_option_container}>
                <div className={classes.selected_option}>{selectedOption}</div>
                <X className={classes.x} onClick={() => handleRemoveOption(selectedOption)}></X>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleDropdown;
