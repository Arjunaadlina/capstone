import React from "react";

function Sugesstion({
    selectedCountry,
    suggestions,
    searchTerm,
    setSearchTerm,
    setSuggestions,
    setSelectedCountry,
    handleSearch,
    handleSelect,}) 

    {
    return (
        <div className="space-y-4 relative">
            <input
                type="text"
                placeholder="Search Country 1"
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value, setSuggestions);
                }}
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-40 overflow-auto">
                {suggestions.map((country) => (
                    <li
                        key={country.cca3}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() =>
                            handleSelect(country, setSelectedCountry, setSearchTerm, setSuggestions)
                        }
                    >
                        {country.name.common}
                    </li>
                ))}
                </ul>
            )}
            {selectedCountry && (
                <div className="p-4 border rounded">
                    <h2 className="text-xl font-bold mb-2">{selectedCountry.name.common}</h2>
                    <img
                        src={selectedCountry.flags.svg}
                        alt={`${selectedCountry.name.common} flag`}
                        className="w-16 h-10 mb-2"
                    />
                    <p className="text-[12px] sm:text-sm md:text-md">Population: {selectedCountry.population.toLocaleString()}</p>
                    <p className="text-[12px] sm:text-sm md:text-md">Region: {selectedCountry.region}</p>
                    <p className="text-[12px] sm:text-sm md:text-md">Capital: {selectedCountry.capital?.[0]}</p>
                </div>
            )}
        </div>
    );
}

export default Sugesstion;
