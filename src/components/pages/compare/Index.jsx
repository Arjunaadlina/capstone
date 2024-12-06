import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Compare = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);

  // Fetch all countries
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSearch = (searchTerm, setSuggestions) => {
    const filteredCountries = countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredCountries.slice(0, 5)); 
  };

  const handleSelect = (country, setSelectedCountry, setSearchTerm, setSuggestions) => {
    setSelectedCountry(country);
    setSearchTerm(country.name.common);
    setSuggestions([]);
  };


  const chartData = {
    labels: [
      selectedCountry1?.name.common || "Country 1",
      selectedCountry2?.name.common || "Country 2",
    ],
    datasets: [
      {
        label: "Population",
        data: [
          selectedCountry1?.population || 0,
          selectedCountry2?.population || 0,
        ],
        backgroundColor: [ 'rgba(215, 178, 109, 0.6)', '#2c2724'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Population Comparison",
      },
    },
  };

  return (
    <div className="p-6 space-y-6 lg:px-32">
      <div className="grid grid-cols-2 gap-4">
        {/* Country 1 Input */}
        <div className="space-y-4 relative">
          <input
            type="text"
            placeholder="Search Country 1"
            className="w-full p-2 border rounded"
            value={searchTerm1}
            onChange={(e) => {
              setSearchTerm1(e.target.value);
              handleSearch(e.target.value, setSuggestions1);
            }}
          />
          {suggestions1.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-40 overflow-auto">
              {suggestions1.map((country) => (
                <li
                  key={country.cca3}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() =>
                    handleSelect(country, setSelectedCountry1, setSearchTerm1, setSuggestions1)
                  }
                >
                  {country.name.common}
                </li>
              ))}
            </ul>
          )}
          {selectedCountry1 && (
            <div className="p-4 border rounded">
              <h2 className="text-xl font-bold mb-2">{selectedCountry1.name.common}</h2>
              <img
                src={selectedCountry1.flags.svg}
                alt={`${selectedCountry1.name.common} flag`}
                className="w-16 h-10 mb-2"
              />
              <p>Population: {selectedCountry1.population.toLocaleString()}</p>
              <p>Region: {selectedCountry1.region}</p>
              <p>Capital: {selectedCountry1.capital?.[0]}</p>
            </div>
          )}
        </div>

        {/* Country 2 Input */}
        <div className="space-y-4 relative">
          <input
            type="text"
            placeholder="Search Country 2"
            className="w-full p-2 border rounded"
            value={searchTerm2}
            onChange={(e) => {
              setSearchTerm2(e.target.value);
              handleSearch(e.target.value, setSuggestions2);
            }}
          />
          {suggestions2.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-40 overflow-auto">
              {suggestions2.map((country) => (
                <li
                  key={country.cca3}
                  className="p-2 hover:bg-green-100 cursor-pointer"
                  onClick={() =>
                    handleSelect(country, setSelectedCountry2, setSearchTerm2, setSuggestions2)
                  }
                >
                  {country.name.common}
                </li>
              ))}
            </ul>
          )}
          {selectedCountry2 && (
            <div className="p-4 border rounded">
              <h2 className="text-xl font-bold mb-2">{selectedCountry2.name.common}</h2>
              <img
                src={selectedCountry2.flags.svg}
                alt={`${selectedCountry2.name.common} flag`}
                className="w-16 h-10 mb-2"
              />
              <p>Population: {selectedCountry2.population.toLocaleString()}</p>
              <p>Region: {selectedCountry2.region}</p>
              <p>Capital: {selectedCountry2.capital?.[0]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Population Comparison Chart */}
      <div className="mt-6 h-96">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Compare;
