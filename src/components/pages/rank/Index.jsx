import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryData } from '../../../redux/thunk';
import Detail from './Detail';
import Table from './Table';
import gsap from 'gsap';
import Fitur from './Fitur';
import '../../../assets/css/skleton.css';

function Rank() {
    const dispatch = useDispatch();
    const sortedCountries = useSelector((state) => state.sortedCountries);
    const loading = useSelector((state) => state.loading);

    const [selectedCountry, setSelectedCountry] = useState(sortedCountries[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('ascending');
    const [countriesPerPage, setCountriesPerPage] = useState(50);
    const [rankBy, setRankBy] = useState('population');

    useEffect(() => {
        if (sortedCountries.length === 0) {
            dispatch(fetchCountryData());
            const timer = setTimeout(() => {
                if (sortedCountries.length === 0) {
                    window.alert('Failed to fetch valid country data. Please refresh the page.');
                    window.location.reload();
                }
            }, 15000);

            return () => clearTimeout(timer);
        }
    }, [dispatch, sortedCountries]);


    const rankCountries = (countries, rankBy, sortOrder) => {
        const sorted = [...countries].sort((a, b) => {
            const key = rankBy === 'area' ? 'area' : 'population';
            return sortOrder === 'ascending' ? b[key] - a[key] : a[key] - b[key];
        });
        return sorted.map((country, index) => ({
            ...country,
            originalIndex: index + 1,
        }));
    };

    const handleCountryClick = (country) => {
    setSelectedCountry(country);
    window.scrollTo({
        top: 0, 
        behavior: 'smooth', 
    });
    };

    const handlePageChange = (page) => setCurrentPage(page);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
    };
    const handleSortOrderChange = (e) => setSortOrder(e.target.value);
    const handleCountriesPerPageChange = (e) => {
        setCountriesPerPage(Number(e.target.value));
        setCurrentPage(0);
    };

    const filteredCountries = rankCountries(
        sortedCountries || [],
        rankBy,
        sortOrder
    ).filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = currentPage * countriesPerPage;
    const endIndex = startIndex + countriesPerPage;
    const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

    return (
        <div className="sm:px-16 lg:px-32 px-6 lg:mt-6 md:pt-0 mt-8 md:mt-4">
            {loading ? (
                <div className="mt-20 sm:px-16 md:px-32 px-8">
                    <div className="skeleton skeleton-hero"></div>
                    <div className="skeleton skeleton-content1"></div>
                    <div className="skeleton skeleton-content2"></div>
                    <div className="skeleton skeleton-content3"></div>
                </div>
            ) : (
                <>
                    <Fitur
                        countriesPerPage={countriesPerPage}
                        handleCountriesPerPageChange={handleCountriesPerPageChange}
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                        sortOrder={sortOrder}
                        handleSortOrderChange={handleSortOrderChange}
                        rankBy={rankBy}
                        setRankBy={setRankBy}
                    />
                    <div className="flex flex-col md:flex-row gap-4 lg:h-[450px]">
                        <Detail selectedCountry={selectedCountry} />
                        <div className="overflow-y-auto h-full flex-1">
                            <Table
                                countriesToDisplay={countriesToDisplay}
                                handleCountryClick={handleCountryClick}
                                rankBy={rankBy}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end items-end mt-4">
                        <div className="flex justify-between items-center w-full md:w-1/3">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-4 py-2 bg-primary-brown text-white text-sm rounded hover:bg-orange-200"
                                disabled={currentPage === 0}
                            >
                                Prev
                            </button>
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index)}
                                        className={`px-2 py-1 border rounded ${
                                            currentPage === index
                                                ? 'bg-primary-brown text-white'
                                                : 'bg-white text-primary-brown'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 py-2 bg-primary-brown text-white text-sm rounded hover:bg-orange-200"
                                disabled={endIndex >= filteredCountries.length}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Rank;
