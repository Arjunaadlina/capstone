import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PopulationAllChart from './PopulationAllChart';
import axios from 'axios';

const SubContent = () => {
  const [continentData, setContinentData] = useState({});
  const numberElement = useRef(null); // Referensi ke elemen angka
  const [isInView, setIsInView] = useState(false); // Status apakah elemen sudah terlihat di layar

  useEffect(() => {
    // Membuat observer untuk memeriksa apakah elemen sudah terlihat di layar
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Jika elemen terlihat, set isInView ke true
          observer.disconnect(); // Hentikan pengamatan setelah elemen terlihat
        }
      },
      { threshold: 0.5 } // 50% elemen harus terlihat untuk memulai animasi
    );

    if (numberElement.current) {
      observer.observe(numberElement.current); // Mulai mengamati elemen
    }

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  useEffect(() => {
    if (isInView) {
      // Angka awal dan target
      const startNumber = 5000000000;
      const targetNumber = 7000000000;

      // Objek untuk menyimpan angka animasi
      const numberAnimation = { currentNumber: startNumber };

      // Animasi GSAP
      gsap.to(numberAnimation, {
        currentNumber: targetNumber,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: function () {
          // Format angka dan set teks elemen
          if (numberElement.current) {
            numberElement.current.textContent = Math.round(numberAnimation.currentNumber).toLocaleString('en-US');
          }
        }
      });
    }
  }, [isInView]);

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
<div className="mt-20 px-32 border border-primary-brown p-4 break-words">
  <p className="text-5xl font-bold text-center tracking-wide text-primary-brown">
    This year the world population is
  </p>
  <div className="text-center mt-4 text-primary-brown mb-12">
    <span ref={numberElement} className="number text-5xl font-bold">5.000.000.000</span>
  </div>
  <div className="sm:flex gap-8 mt-12 items-start">
    <div className="sm:w-2/5 text-primary-brown border border-primary-brown p-4 break-words">
      <p>
        cioenciesncsneoincsoiencsoneoincosiensiencsoincoienoininoenscinesoncsoncosncsoincsoincosncoiensoienoc
      </p>
    </div>
    <div className="sm:w-3/5">
      <PopulationAllChart continentData={continentData} />
    </div>
  </div>
</div>


  );
};

export default SubContent;
