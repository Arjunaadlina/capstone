import axios from 'axios';
import {
    setContinentData,
    setWorldPopulation,
    setIndonesiaRank,
    setSortedCountries,
    setLoading, 
    setError,  
    setNewsData,
    setLoadingNews
} from './actions';

export const fetchCountryData = () => async (dispatch) => {
    try {
        dispatch(setLoading(true)); 

        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data || []; 

        const continentData = countries.reduce((acc, country) => {
            const continent = country.region || 'Unknown';
            if (!acc[continent]) {
                acc[continent] = { count: 0, population: 0 };
            }
            acc[continent].count += 1;
            acc[continent].population += country.population || 0;
            return acc;
        }, {});

        const totalPopulation = countries.reduce((sum, country) => sum + (country.population || 0), 0);

        const sortedCountries = [...countries].sort((a, b) => (b.population || 0) - (a.population || 0));

        const indonesiaIndex = sortedCountries.findIndex(
            (country) => country.name.common === 'Indonesia'
        );
        const indonesiaRank = indonesiaIndex !== -1 ? indonesiaIndex + 1 : null;

        dispatch(setContinentData(continentData));
        dispatch(setWorldPopulation(totalPopulation));
        dispatch(setSortedCountries(sortedCountries));
        dispatch(setIndonesiaRank(indonesiaRank));
    } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setError('Server error. Failed to fetch country data. Please try again later.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchNewsData = () => async (dispatch) => {
    try { 
        dispatch(setLoadingNews(true));
        const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
            {
                params: {
                q: 'Peace',
                    'api-key': import.meta.env.APP_NYT_SECRET,
                },
            }
        );

        dispatch(setNewsData(response.data.response.docs.slice(0, 12))); 
    } catch (error) {
        console.error('Error fetching news data:', error);
        dispatch(setError('Failed to fetch news data. Please try again later.'));
    } finally {
        dispatch(setLoadingNews(false));
    }
};
