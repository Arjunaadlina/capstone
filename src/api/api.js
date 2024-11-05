export const fetchPopulationData = async () => {
    const api = process.env.API
    try {
        const response = await fetch(api);
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
