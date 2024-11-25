// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContinentChart from './components/ContinentChart';
import './App.css';
import PopulationAllChart from './components/PopulationAllChart';
import Hero from './components/Hero';
import Bento from './components/Bento';
import SubContent from './components/SubContent';

const App = () => {
  const [continentData, setContinentData] = useState({});

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data = response.data.reduce((acc, country) => {
          const continent = country.region;
          if (!acc[continent]) {
            acc[continent] = { count: 0, population: 0 };
          }
          acc[continent].count += 1;
          acc[continent].population += country.population;
          return acc;
        }, {});

        setContinentData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{height: '100vh'}}>
      <Hero />
      <SubContent/>
    </div>
  );
}

export default App;
