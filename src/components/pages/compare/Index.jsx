import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Sugesstion from "./Sugesstion";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Compare = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);


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


  return (
    <div className="p-6 space-y-6 lg:px-32">
      <div className="grid grid-cols-2 gap-4">
        <Sugesstion 
          selectedCountry={selectedCountry1} 
          suggestions={suggestions1} 
          searchTerm={searchTerm1} 
          setSearchTerm={setSearchTerm1} 
          setSuggestions={setSuggestions1} 
          setSelectedCountry={setSelectedCountry1} 
          handleSearch={handleSearch} 
          handleSelect={handleSelect} 
        />

        <Sugesstion 
          selectedCountry={selectedCountry2} 
          suggestions={suggestions2} 
          searchTerm={searchTerm2} 
          setSearchTerm={setSearchTerm2} 
          setSuggestions={setSuggestions2} 
          setSelectedCountry={setSelectedCountry2} 
          handleSearch={handleSearch} 
          handleSelect={handleSelect} 
        />
      </div>

      <div className="flex flex-col xl:flex-row w-full justify-between ">
        <BarChart selectedCountry1={selectedCountry1} selectedCountry2={selectedCountry2}/>
        <PieChart selectedCountry1={selectedCountry1} selectedCountry2={selectedCountry2}/>
      </div>
    </div>
  );
};

export default Compare;
