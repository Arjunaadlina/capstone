import React, { useEffect } from 'react'
import Content1 from './Content1'
import Content2 from './Content2'
import Content3 from './Content3'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountryData } from '../../../redux/thunk'
import Hero from './Hero'

function Dashboard() {
    const dispatch = useDispatch();
    const continentData = useSelector((state) => state.continentData);
    const worldPopulation = useSelector((state) => state.worldPopulation);
    const indonesiaRank = useSelector((state) => state.indonesiaRank);
    const sortedCountries = useSelector((state) => state.sortedCountries);

    useEffect(() => {
        if(sortedCountries !== true){
            dispatch(fetchCountryData())
        }
    }, [dispatch]);

    return (
        <div>
            <Hero />
            <Content1 continentData={continentData} worldPopulation={worldPopulation} />
            <Content2 indonesiaRank={indonesiaRank} />
            <Content3 top1={sortedCountries[0]} lastTop={sortedCountries[sortedCountries.length - 1]} />
        </div>
    )
}

export default Dashboard