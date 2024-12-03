import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import indonesiaMap from '../../../assets/indonesia.svg';
import '../../../assets/css/map.css';

const Content2 = ({ indonesiaRank }) => {
    const animateSVG = useRef(null);  
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

            if (animateSVG.current) {
            observer.observe(animateSVG.current); 
        }

        return () => observer.disconnect()
    }, []);

    useEffect(() => {
        if (isInView) {
            gsap.fromTo(
                animateSVG.current,
                { opacity: 0, x: -30 },  
                {opacity: 1, x: 0, duration: 1.5,  ease: 'power3.out'}
            )
        }
    }, [isInView])

    return (
        <div className="mt-28 lg:flex lg:justify-center w-full h-auto sm:px-16 md:px-32 px-8 gap-8 items-start">
            <div className="lg:w-3/5 sm:w-full ">
                <img src={indonesiaMap} alt="Map of Indonesia" className="w-full h-auto map-indo opacity-0" ref={animateSVG}  />
            </div>
            <div className="sm:w-full lg:w-2/5 mt-10 sm:mt-0">
                <p className="text-xl font-semibold mb-4">Indonesia's Rank {indonesiaRank}</p>
                <p className="">Indonesia is the {indonesiaRank}th most populous country in the world, with a population exceeding 270 million people. Located in Southeast Asia, Indonesia consists of more than 17,000 islands, making it the world's largest archipelago. The country has a rich cultural heritage and a diverse population, with over 300 ethnic groups and over 700 languages spoken.</p>
            </div>
        </div>
    );
};

export default Content2;
