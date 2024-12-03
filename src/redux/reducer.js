
import {
    SET_CONTINENT_DATA,
    SET_WORLD_POPULATION,
    SET_INDONESIA_RANK,
    SET_SORTED_COUNTRIES,
} from './actions';

const initialState = {
    continentData: {},
    worldPopulation: 0,
    indonesiaRank: null,
    sortedCountries: [],
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
        default:
            return state;
    }
};

export default reducer;
