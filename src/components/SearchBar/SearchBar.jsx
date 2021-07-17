import React, { useState } from "react";
import { SearchResults } from "..";
import { SearchIcon, CloseIcon } from "../../assets";

export const SearchBar = () => {
  const [searchPopOver, setSearchPopOver] = useState(false);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center mt-2 bg-gray-100 rounded-full">
        <div style={{ display: searchPopOver && "none" }}>
          <SearchIcon />
        </div>

        <input
          type="text"
          value={searchedKeyword}
          onChange={(e) => setSearchedKeyword(e.target.value)}
          onFocus={() => setSearchPopOver(true)}
          className="bg-gray-100 py-2 px-4 mr-3 text-base rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Search"
        />

        <div style={{ display: !searchPopOver && "none" }}>
          <CloseIcon
            setSearchPopOver={setSearchPopOver}
            setSearchedKeyword={setSearchedKeyword}
          />
        </div>
      </div>
      {searchPopOver && <SearchResults searchedKeyword={searchedKeyword} />}
    </div>
  );
};
