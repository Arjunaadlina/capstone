import React from 'react';

function Table({ countriesToDisplay, handleCountryClick, rankBy }) {
    const formatNumber = (number) => {
        if (number >= 1_000_000_000) {
            return `${(number / 1_000_000_000).toFixed(1)}B`; // Billions
        } else if (number >= 1_000_000) {
            return `${(number / 1_000_000).toFixed(1)}M`; // Millions
        }
        return number.toLocaleString(); // Regular formatting for smaller numbers
    };

    return (
        <table className="min-w-full border-collapse border bg-primary-cream">
            <thead className="bg-primary-brown sticky top-0 z-2">
                <tr>
                    <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Rank</th>
                    <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Flag</th>
                    <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Country</th>
                    <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Code</th>
                    {rankBy === 'population' && (
                        <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Population</th>
                    )}
                    {rankBy === 'area' && (
                        <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Area (km²)</th>
                    )}
                    <th className="px-4 py-2 border border-primary-brown bg-primary-brown text-center text-primary-cream text-sm md:text-md">Languages</th>
                </tr>
            </thead>
            <tbody>
                {countriesToDisplay &&
                    countriesToDisplay.map((country) => (
                        <tr
                            key={country.cca3}
                            className="even:bg-primary-cream cursor-pointer hover:bg-orange-200"
                            onClick={() => handleCountryClick(country)}
                        >
                            <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                {country.originalIndex}
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
                                {country.cca2 || 'N/A'}
                            </td>
                            {rankBy === 'population' && (
                                <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                    {country.population && formatNumber(country.population)}
                                </td>
                            )}
                            {rankBy === 'area' && (
                                <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                    {country.area ? formatNumber(country.area) : 'N/A'}
                                </td>
                            )}
                            <td className="px-4 py-2 border border-primary-brown text-center text-sm md:text-md">
                                {country.languages
                                    ? Object.values(country.languages).join(', ')
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default Table;
