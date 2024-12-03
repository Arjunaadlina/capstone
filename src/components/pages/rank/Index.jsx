import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryData } from '../../../redux/thunk';

function Rank() {
    const dispatch = useDispatch();
    const sortedCountries = useSelector((state) => state.sortedCountries);
    const [selectedCountry, setSelectedCountry] = useState(sortedCountries[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const countriesPerPage = 50;

    useEffect(() => {
        if (sortedCountries !== true) {
            dispatch(fetchCountryData());
        }
    }, [dispatch]);

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

    const startIndex = currentPage * countriesPerPage;
    const endIndex = startIndex + countriesPerPage;
    const countriesToDisplay = sortedCountries && sortedCountries.slice(startIndex, endIndex);

    const totalPages = Math.ceil(sortedCountries?.length / countriesPerPage);

    return (
        <div className='sm:px-16 lg:px-32 px-6 lg:mt-8 mt-2'>
            <div className="flex flex-col md:flex-row gap-4 lg:h-[450px]">
                <div className="w-full md:w-1/3 rounded-md p-2">
                    {selectedCountry && (
                        <div className='mt-20'>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                {selectedCountry.name.common}
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={selectedCountry.flags.svg}
                                        alt={`${selectedCountry.name.common} Flag`}
                                        className="w-32 h-20 object-cover mr-4 border border-gray-300"
                                    />
                                    <div>
                                        <p>
                                            <span className="font-semibold">Population :        </span>{' '}
                                            {selectedCountry.population.toLocaleString()}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Region : </span>{' '}
                                            {selectedCountry.region || 'N/A'}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Subregion : </span>{' '}
                                            {selectedCountry.subregion || 'N/A'}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Languages : </span>{' '}
                                            {selectedCountry.languages
                                                ? Object.values(selectedCountry.languages).join(', ')
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-semibold">Capital : </span>{' '}
                                        {selectedCountry.capital
                                            ? selectedCountry.capital.join(', ')
                                            : 'N/A'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Area : </span>{' '}
                                        {selectedCountry.area.toLocaleString()} km²
                                    </p>
                                    <p>
                                        <span className="font-semibold">Country Code : </span>{' '}
                                        {selectedCountry.cca2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tabel Negara */}
                <div className="flex-1 overflow-y-auto h-full">
                    <table className="min-w-full border-collapse border bg-primary-cream">
                        <thead className="bg-primary-brown sticky top-0 z-1">
                            <tr>
                                <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Rank</th>
                                <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Flag</th>
                                <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Country</th>
                                <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Population</th>
                                <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Languages</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countriesToDisplay &&
                                countriesToDisplay.map((country, index) => (
                                    <tr
                                        key={country.cca3}
                                        className="even:primary-brown cursor-pointer hover:bg-orange-200"
                                        onClick={() => handleCountryClick(country)}
                                    >
                                        <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-4 py-2 border border-primary-brown">
                                            <img
                                                src={country.flags.svg}
                                                alt={`${country.name.common} Flag`}
                                                className="w-10 h-6 object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                            {country.name.common}
                                        </td>
                                        <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                            {country.population.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                            {country.languages
                                                ? Object.values(country.languages).join(', ')
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full flex justify-end items-end mt-4'>
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
                        disabled={endIndex >= sortedCountries.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rank;
