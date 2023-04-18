import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ componentId, data, setStock }) => {
  const [itemOptions, setItemOptions] = useState([]);
  const searchInput = useRef("");

  const handleSearchInputChange = (e) => {
    console.log("handleSearchInput", searchInput.current.value);
    const jsonData = Array.isArray(data) ? data : JSON.parse(data);
    const filteredData = jsonData
      .filter((stock) =>
        stock.company_name.includes(searchInput.current.value.toUpperCase())
      )
      .map((stock, index) => {
        return {
          name: stock.company_name,
          index: index,
          id: stock.id,
          ticker: stock.ticker,
        };
      })
      .slice(0, 10);
    setItemOptions(filteredData);
    setStock(e.target.value);
  };

  useEffect(() => {
    //console.log("useEffect", searchInput.current.value);
  }, [searchInput.current.value]);

  return (
    <div className="mb-4 relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className={`search-bar w-full`}>
        <input
          type="text"
          ref={searchInput}
          name={componentId}
          list={componentId}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block pl-10 p-2.5"
          placeholder="Search"
          autoComplete="off"
          onChange={(e) => handleSearchInputChange(e)}
        />
        <datalist id={componentId}>
          {itemOptions.map((stock) => (
            <option key={stock.index} value={stock.name}>
              {`${stock.ticker} - ${stock.name}`}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default SearchBar;
