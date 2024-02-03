import { BsSearch, BsX } from "react-icons/bs";
import { ChangeEvent, useEffect, useState } from "react";
import { useInputContext } from "../../context/InputContext";
import { InputProps } from "../../Types";
import { useCountryContext } from "../../context/CountryContext";

const Input: React.FC<InputProps> = ({ onClick }) => {
  const { inputValue, setInputValue } = useInputContext();
  const { fetchListOfCountries } = useCountryContext();
  const [listCountries, setListCountries] = useState<string[] | null>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const countriesList = await fetchListOfCountries();
        setListCountries(countriesList);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    getList();
  }, [fetchListOfCountries]);

  const getSuggestions = (value: string) => {
    const inputValueLowerCase = value.toLowerCase();
    return (
      listCountries?.filter((country) =>
        country.toLowerCase().includes(inputValueLowerCase)
      ) || []
    );
  };

  const getValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSuggestions(getSuggestions(value));
  };

  const resetValue = () => {
    setInputValue("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };
  const handleButtonClick = () => {
    onClick();
  };
  return (
    <div className="relative mt-5 text-gray-600 focus-within:text-gray-400 type-country">
      <button
        onClick={handleButtonClick}
        className="absolute inset-y-0 left-0 flex items-center px-2 focus:outline-none focus:shadow-outline hover:bg-white focus:bg-white hover:rounded-bl focus:rounded-bl hover:rounded-tl focus:rounded-tl"
      >
        <BsSearch />
      </button>

      <input
        onChange={getValue}
        value={inputValue}
        name="q"
        className="w-full py-2 pl-10 text-sm text-white bg-gray-900 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
        id="search-input"
        placeholder="Search..."
        autoComplete="off"
      />

      {inputValue.length >= 2 && suggestions.length > 0 && (
        <div className="absolute top-10 left-0 right-0 bg-white border rounded-md overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full cursor-pointer hover:bg-gray-200 p-2 focus:outline-gray-200 focus:bg-gray-200 hover:text-black focus:text-black"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {inputValue.length >= 1 ? (
        <button
          onClick={resetValue}
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none focus:shadow-outline hover:bg-white focus:bg-white hover:rounded-br focus:rounded-br hover:rounded-tr focus:rounded-tr"
        >
          <BsX />
        </button>
      ) : null}
    </div>
  );
};

export default Input;
