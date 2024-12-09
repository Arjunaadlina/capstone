export const SET_CONTINENT_DATA = 'SET_CONTINENT_DATA';
export const SET_WORLD_POPULATION = 'SET_WORLD_POPULATION';
export const SET_INDONESIA_RANK = 'SET_INDONESIA_RANK';
export const SET_SORTED_COUNTRIES = 'SET_SORTED_COUNTRIES';
export const SET_LOADING = 'SET_LOADING'; 
export const SET_ERROR = 'SET_ERROR'; 

export const setContinentData = (data) => ({
    type: SET_CONTINENT_DATA,
    payload: data,
});

export const setWorldPopulation = (population) => ({
    type: SET_WORLD_POPULATION,
    payload: population,
});

export const setIndonesiaRank = (rank) => ({
    type: SET_INDONESIA_RANK,
    payload: rank,
});

export const setSortedCountries = (countries) => ({
    type: SET_SORTED_COUNTRIES,
    payload: countries,
});

export const setLoading = (status) => ({
    type: SET_LOADING,
    payload: status,
});

export const setError = (message) => ({
    type: SET_ERROR,
    payload: message,
});