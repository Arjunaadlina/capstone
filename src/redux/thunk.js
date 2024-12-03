import axios from 'axios';
import {
    setContinentData,
    setWorldPopulation,
    setIndonesiaRank,
    setSortedCountries,
} from './actions';

export const fetchCountryData = () => async (dispatch) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const data = response.data.reduce((acc, country) => {
        const continent = country.region

        if (!acc[continent]) {
            acc[continent] = { count: 0, population: 0 }
        }

        acc[continent].count += 1
        acc[continent].population += country.population
        
        return acc;
    }, {});

        const totalPopulation = response.data.reduce((sum, country) => sum + country.population, 0);
        const sortedCountries = response.data.sort((a, b) => b.population - a.population);
        const indonesiaIndex = sortedCountries.findIndex(country => country.name.common === "Indonesia");
        const indonesiaRank = indonesiaIndex !== -1 ? indonesiaIndex + 1 : null;

        dispatch(setContinentData(data));
        dispatch(setWorldPopulation(totalPopulation));
        dispatch(setSortedCountries(sortedCountries));
        dispatch(setIndonesiaRank(indonesiaRank));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
