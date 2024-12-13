import React, { useEffect } from 'react';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData } from '../../../redux/thunk';
import Hero from './Hero';
import '../../../assets/css/skleton.css';

function Dashboard() {
    const dispatch = useDispatch();
    const continentData = useSelector((state) => state.continentData);
    const worldPopulation = useSelector((state) => state.worldPopulation);
    const indonesiaRank = useSelector((state) => state.indonesiaRank);
    const sortedCountries = useSelector((state) => state.sortedCountries);

    const loading = useSelector((state) => state.loading);

    useEffect(() => {
        if (sortedCountries.length === 0) {
            dispatch(fetchCountryData());
            const timer = setTimeout(() => {
                if (sortedCountries.length === 0) {
                    window.alert('Failed to fetch valid country data. Please refresh the page.');
                    window.location.reload();
                }
            }, 15000);

            return () => clearTimeout(timer);
        }
    }, [dispatch, sortedCountries.length]);

    if (loading) {
        return (
            <div className='mt-8 sm:px-16 md:px-32 px-8'>
                <div className="skeleton skeleton-hero"></div>
                <div className="skeleton skeleton-content1"></div>
                <div className="skeleton skeleton-content2"></div>
                <div className="skeleton skeleton-content3"></div>
            </div>
        );
    }

    return (
        <div>
            <Hero />
            <Content1 continentData={continentData} worldPopulation={worldPopulation} />
            <Content2 indonesiaRank={indonesiaRank} />
            <Content3 top1={sortedCountries[0]} lastTop={sortedCountries[sortedCountries.length - 1]} />
        </div>
    );
}

export default Dashboard;
