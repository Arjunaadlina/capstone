

function Card({ country, desc }) {
    return (
        <li >
            <div className="bg-white overflow-hidden rounded-lg flex flex-col lg:flex-row">
                <figure className="h-44">
                    <img
                        src={country ? country.flags.png : ""}
                        alt="Country rank 1 population"
                        className="lg:w-80 h-48"
                        loading="lazy"
                    />
                </figure>
                <div className="p-6 lg:w-3/6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Country with the {desc} population in the world
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        This country has a population of {country && country.population}
                    </p>
                    <ul className="flex flex-wrap items-center justify-center bg-white shadow rounded-full px-4 py-2 space-x-4">
                        <li className="flex items-center space-x-2 text-sm text-gray-600">
                            <i className="text-primary-brown text-md">Reg : {country && country.region}</i>
                        </li>
                        <li className="flex items-center space-x-2 text-sm text-gray-600">
                            <i className="text-primary-brown text-md">Time : {country && country.timezones}</i>
                        </li>
                    </ul>
                </div>
                <div className="bg-primary-cream text-white text-center p-6 flex-1 flex justify-center items-center">
                    <p className="md:text-xl text-md font-bold mb-2 text-primary-brown">
                        {country && country.name.common}
                    </p>
                </div>
            </div>
        </li>
    );
}

export default Card;
