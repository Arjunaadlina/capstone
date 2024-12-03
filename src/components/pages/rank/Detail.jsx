import React from 'react'

function Detail({selectedCountry}) {
    return (
        <div className="w-full md:w-1/3 rounded-md p-2 pt-[-100px]">
            {selectedCountry && (
                <div className='mt-4'>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        {selectedCountry.name.common}
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center md:items-start lg:items-center md:flex-col lg:flex-row mb-4">
                            <img
                                src={selectedCountry.flags.svg}
                                alt={`${selectedCountry.name.common} Flag`}
                                className="w-32 h-20 object-cover mr-4 border border-gray-300 md:mb-4 lg:mb-0"
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
                                        ? (() => {
                                            const languages = Object.values(selectedCountry.languages);
                                            return languages.length > 5
                                                ? `${languages.slice(0, 5).join(', ')}, etc`
                                                : languages.join(', ');
                                        })()
                                        : 'N/A'
                                    }
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
    )
}

export default Detail