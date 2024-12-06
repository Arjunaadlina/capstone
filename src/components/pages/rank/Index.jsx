import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryData } from '../../../redux/thunk';
import Detail from './Detail';
import Table from './Table';
import gsap from 'gsap';
import Fitur from './Fitur';

function Rank() {
    const dispatch = useDispatch();
    const sortedCountries = useSelector((state) => state.sortedCountries);
    const [selectedCountry, setSelectedCountry] = useState(sortedCountries[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('ascending');
    const [countriesPerPage, setCountriesPerPage] = useState(50);
    const [rankBy, setRankBy] = useState('population');
    const [isInView, setIsInView] = useState(false);
    const animateTable = useRef(null);

    useEffect(() => {
        if (!sortedCountries?.length) {
            dispatch(fetchCountryData());
        }
    }, [dispatch, sortedCountries]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (animateTable.current) {
            observer.observe(animateTable.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView) {
            gsap.fromTo(
                animateTable.current,
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' }
            );
        }
    }, [isInView]);

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

    const handleCountryClick = (country) => setSelectedCountry(country);
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
        <div className="sm:px-16 lg:px-32 px-6 lg:mt-5 md:pt-0 mt-8">
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
                <div className="overflow-y-auto h-full flex-1" ref={animateTable}>
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
        </div>
    );
}

export default Rank;
