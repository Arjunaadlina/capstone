import {
    SET_CONTINENT_DATA,
    SET_WORLD_POPULATION,
    SET_INDONESIA_RANK,
    SET_SORTED_COUNTRIES,
    SET_LOADING, 
    SET_ERROR,  
} from './actions';

const initialState = {
    continentData: {},
    worldPopulation: 0,
    indonesiaRank: null,
    sortedCountries: [],
    loading: false,
    error: null, 
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTINENT_DATA:
            return { ...state, continentData: action.payload };

        case SET_WORLD_POPULATION:
            return { ...state, worldPopulation: action.payload };

        case SET_INDONESIA_RANK:
            return { ...state, indonesiaRank: action.payload };

        case SET_SORTED_COUNTRIES:
            return { ...state, sortedCountries: action.payload };

        case SET_LOADING: 
            return { ...state, loading: action.payload };

        case SET_ERROR: 
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default reducer;
