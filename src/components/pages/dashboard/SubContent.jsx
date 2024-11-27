import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PopulationAllChart from './PopulationAllChart';
import axios from 'axios';

const SubContent = () => {
  const [continentData, setContinentData] = useState({});
  const [worldPopulation, setWorldPopulation] = useState(0);
  const numberElement = useRef(null); 
  const [isInView, setIsInView] = useState(false); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); 
          observer.disconnect(); 
        }
      },
      { threshold: 0.5 } 
    );

    if (numberElement.current) {
      observer.observe(numberElement.current); 
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const startNumber = 0; 
      const targetNumber = worldPopulation; 

      const numberAnimation = { currentNumber: startNumber };

      gsap.to(numberAnimation, {
        currentNumber: targetNumber,
        duration: 2,
        ease: 'power3.out',
        onUpdate: function () {
          if (numberElement.current) {
            numberElement.current.textContent = Math.round(numberAnimation.currentNumber).toLocaleString('en-US');
          }
        }
      });
    }
  }, [isInView, worldPopulation]);

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

        const totalPopulation = response.data.reduce((sum, country) => sum + country.population, 0);
        
        setContinentData(data);
        setWorldPopulation(totalPopulation); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="mt-20 sm:px-16 md:px-32 px-8">
      <p className="text-5xl font-bold text-center tracking-wide text-primary-brown">
        This year the world population is
      </p>
      <div className="text-center mt-4 text-primary-brown mb-12">
        <span ref={numberElement} className="number text-5xl font-bold">0</span>
      </div>
      <div className="sm:flex gap-8 mt-12 items-start">
        <div className="sm:w-2/5 text-primary-brown p-4 break-words">
          <p>
            In this world there are 6 continents with the highest population being Asia and the least population being the continent of Antarctica.
          </p>
          <br></br>
        </div>
        <div className="sm:w-4/5 ">
          <PopulationAllChart continentData={continentData} />
        </div>
      </div>
    </div>
  );
};

export default SubContent;
