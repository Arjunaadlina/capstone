import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PopulationAllChart from './PopulationAllChart';
import '../../../assets/css/map.css'

const Content1 = ({continentData, worldPopulation}) => {
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
      const startNumber = 3502321532; 
      const targetNumber = worldPopulation; 

      const numberAnimation = { currentNumber: startNumber };

      gsap.to(numberAnimation, {
        currentNumber: targetNumber,
        duration: 1.5,
        ease: 'power3.out',
        onUpdate: function () {
          if (numberElement.current) {
            numberElement.current.textContent = Math.round(numberAnimation.currentNumber).toLocaleString('en-US');
          }
        }
      });
    }
  }, [isInView, worldPopulation]);


  return (
    <div className="mt-20 sm:px-16 md:px-32 px-8">
      <p className="text-5xl font-bold text-center tracking-wide text-primary-brown">
        This year the world population is
      </p>
      <div className="text-center mt-4 text-primary-brown mb-12">
        <span ref={numberElement} className="number text-5xl font-bold">3502321532</span>
      </div>
      <div className="sm:flex gap-8 mt-12 items-start">
        <div className="sm:w-2/5 text-primary-brown p-4 break-words">
          <h2 className="text-xl font-semibold mb-4">Exploring Population Across Continents</h2>
          <p>
            The world is home to diverse continents, each contributing uniquely to the global population. Asia, the largest continent, leads with the highest population, housing over 60% of the world’s people. Its countries, such as China and India, boast staggering populations that continue to grow and shape global trends.
          </p>
          <br></br>
        </div>
        <div className="md:w-3/5 ">
          <PopulationAllChart continentData={continentData} />
        </div>
      </div>

    </div>
  );
};

export default Content1;
