import React, { useState } from "react";
import { SearchResults } from "..";
import { SearchIcon, CloseIcon } from "../../assets";

export const SearchBar = () => {
  const [searchPopOver, setSearchPopOver] = useState(false);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  return (
    <div className="flex flex-col space-y-1 mt-2 fixed z-10">
      <div className="flex items-center bg-extra-light-gray rounded-full">
        <div style={{ display: searchPopOver && "none" }}>
          <SearchIcon />
        </div>

        <input
          type="text"
          value={searchedKeyword}
          onChange={(e) => setSearchedKeyword(e.target.value)}
          onFocus={() => setSearchPopOver(true)}
          className="bg-extra-light-gray py-2 px-4 mr-3 text-base rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Search"
        />

        <div className={!searchPopOver && "hidden"}>
          <CloseIcon
            setSearchPopOver={setSearchPopOver}
            setSearchedKeyword={setSearchedKeyword}
          />
        </div>
      </div>
      {searchPopOver && (
        <SearchResults
          searchedKeyword={searchedKeyword}
          setSearchPopOver={setSearchPopOver}
          setSearchedKeyword={setSearchedKeyword}
        />
      )}
    </div>
  );
};
