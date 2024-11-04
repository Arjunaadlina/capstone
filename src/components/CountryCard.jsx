// src/components/CountryCard.js
import React from 'react';
import '../assets/css/card.css';

const CountryCard = ({ name, flag, population }) => (
  <div className="country-card">
    <img src={flag} alt={`${name} flag`} className="flag" />
    <div className="country-info">
      <h2>{name}</h2>
      <p>Population: {population.toLocaleString()}</p>
    </div>
  </div>
);

export default CountryCard;
