export const fetchPopulationData = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
        return data.map(country => ({
            name: country.name?.common || "Unknown",
            population: country.population || 0
        }));
        
    } catch (error) {
        console.error("Error fetching population data:", error);
    }
};
