import React, { useState, useEffect } from "react";
import axios from "axios";
import Sugesstion from "./Sugesstion";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import '../../../assets/css/skleton.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryData } from "../../../redux/thunk";


const Compare = () => {
  const dispatch = useDispatch();
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);
  const loading = useSelector((state) => state.loading);
  const countries = useSelector((state) => state.sortedCountries);

  useEffect(() => {
    if(countries.length === 0){
        dispatch(fetchCountryData())
        const timer = setTimeout(() => {
          if (sortedCountries.length === 0) {
              window.alert('Failed to fetch valid country data. Please refresh the page.');
              window.location.reload();
          }
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, countries.length])

  if (loading) {
    return (
        <div className='mt-20 sm:px-16 md:px-32 px-8'>
            <div className="skeleton skeleton-hero"></div>
            <div className="skeleton skeleton-content1"></div>
            <div className="skeleton skeleton-content2"></div>
            <div className="skeleton skeleton-content3"></div>
        </div>
    );
}

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
