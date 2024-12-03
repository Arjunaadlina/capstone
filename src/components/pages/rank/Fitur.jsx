import React from 'react'

function Fitur({sortOrder, handleSortOrderChange, countriesPerPage, handleCountriesPerPageChange, searchQuery, handleSearchChange}) {
    return (
        <div className={`flex flex-col sm:flex-row items-end justify-end mb-4 gap-2`}>
            <div className="flex gap-2">
                <select
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                    className="px-4 py-2 border rounded border-primary-cream"
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
                <select
                    value={countriesPerPage}
                    onChange={handleCountriesPerPageChange}
                    className="px-4 py-2 border rounded border-primary-cream h-10"
                >
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={150}>150</option>
                    <option value={200}>200</option>
                    <option value={250}>250</option>
                </select>
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search country..."
                className="w-72 px-4 py-2 rounded border-primary-cream border-2 h-10"
            />
        </div>
    )
}

export default Fitur