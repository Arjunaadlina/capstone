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
    const animateTable = useRef(null);  
    const [isInView, setIsInView] = useState(false);

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

        return () => observer.disconnect()
    }, []);

    useEffect(() => {
        if (isInView) {
            gsap.fromTo(
                animateTable.current,
                { opacity: 0, x: -30 },  
                {opacity: 1, x: 0, duration: 1.5,  ease: 'power3.out'}
            )
        }
    }, [isInView])


    useEffect(() => {
        if (!sortedCountries?.length) {
            dispatch(fetchCountryData());
        }
    }, [dispatch, sortedCountries]);

    const countriesWithIndex = sortedCountries?.map((country, index) => ({
        ...country,
        originalIndex: index + 1,
    }));

    const sortedCountriesByOrder = [...(countriesWithIndex || [])].sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.originalIndex - b.originalIndex;
        }
        return b.originalIndex - a.originalIndex;
    });

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0); 
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleCountriesPerPageChange = (e) => {
        setCountriesPerPage(Number(e.target.value));
        setCurrentPage(0); 
    };

    const filteredCountries = sortedCountriesByOrder?.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = currentPage * countriesPerPage;
    const endIndex = startIndex + countriesPerPage;
    const countriesToDisplay = filteredCountries?.slice(startIndex, endIndex);
    const totalPages = Math.ceil((filteredCountries?.length || 0) / countriesPerPage);

    return (
        <div className="sm:px-16 lg:px-32 px-6 lg:mt-5 md:pt-0 mt-8 ">
            <Fitur countriesPerPage={countriesPerPage} handleCountriesPerPageChange={handleCountriesPerPageChange} searchQuery={searchQuery} handleSearchChange={handleSearchChange} sortOrder={sortOrder} handleSortOrderChange={handleSortOrderChange}
            />
            <div className="flex flex-col md:flex-row gap-4 lg:h-[450px]">
                <Detail selectedCountry={selectedCountry} />
                <div className="overflow-y-auto h-full flex-1" ref={animateTable}>
                    <Table
                        countriesToDisplay={countriesToDisplay}
                        handleCountryClick={handleCountryClick}
                    />
                </div>
            </div>
            <div className="w-full flex justify-end items-end mt-4">
                <div className="flex justify-between items-center w-full md:w-1/3">
                    <button
                        onClick={handlePreviousPage}
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
                        onClick={handleNextPage}
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
