// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Hero from './components/pages/dashboard/Hero';
import Content1 from './components/pages/dashboard/Content1';
import Content2 from './components/pages/dashboard/Content2';
import Content3 from './components/pages/dashboard/Content3';
import Footer from './components/pages/dashboard/Footer';

const App = () => {
  const [continentData, setContinentData] = useState({});
  const [worldPopulation, setWorldPopulation] = useState(0);
  const [indonesiaRank, setIndonesiaRank] = useState(null); 
  const [sortedCountries, setSortedCountries] = useState([]);

  const axiosInstance = axios.create({
    transport: new XMLHttpRequest(),
  }); 

  useEffect(() => {
    axiosInstance.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data = response.data.reduce((acc, country) => {
          const continent = country.region
          if (!acc[continent]) {
            acc[continent] = { count: 0, population: 0 }
          }
          acc[continent].count += 1;
          acc[continent].population += country.population
          return acc
        }, {})

        const totalPopulation = response.data.reduce((sum, country) => sum + country.population, 0);

        const sortedCountries = response.data.sort((a, b) => b.population - a.population);

        const indonesiaIndex = sortedCountries.findIndex(country => country.name.common === "Indonesia")
        const indonesiaRank = indonesiaIndex !== -1 ? indonesiaIndex + 1 : null

        setContinentData(data);
        setWorldPopulation(totalPopulation); 
        setSortedCountries(sortedCountries);
        setIndonesiaRank(indonesiaRank);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log(sortedCountries)

  return (
    <div>
      <Hero />
      <Content1 continentData={continentData} worldPopulation={worldPopulation} />
      <Content2 indonesiaRank={indonesiaRank}/>
      <Content3 top1={sortedCountries[0]} lastTop={sortedCountries[sortedCountries.length - 1]}/>
      <Footer />
    </div>
  );
}

export default App;
