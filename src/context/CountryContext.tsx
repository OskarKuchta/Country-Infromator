// CountryContext.js
import { createContext, useContext, useState, ReactNode } from "react";
import { Country, CountryContextProps } from "../Types";
import { useInputContext } from "./InputContext";
import { toast } from "react-toastify";

const CountryContext = createContext<CountryContextProps | undefined>(
  undefined
);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { inputValue } = useInputContext();
  const [search, setSearch] = useState<boolean>(true);
  const [full, setFull] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [population, setPopulation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [continent, setContinent] = useState<string>("");
  const [resultFlag, setResultFlag] = useState<string>("");

  const regex: RegExp = /[^a-zA-Z]/g;

  const searchCountry = async () => {
    if (inputValue.trim() === "") {
      toast.error("You forgot to type the country name!");
      return;
    } else if (inputValue.match(regex)) {
      toast.error("Invalid characters in input!");
      return;
    } else if (inputValue.length <= 3) {
      toast.error("Country name is too short!");
      return;
    } else {
      try {
        const response = await fetch(
          "https://country-informator.netlify.app/.netlify/functions/server/getInfo"
        );
        const nestedData = await response.json();

        const data = nestedData.find(
          (item: Country) => item.name.common === inputValue
        );
        const currencies = data.currencies;
        const currencyKeys = Object.keys(currencies);
        const primaryCurrency =
          currencyKeys.length > 0 ? currencyKeys[0] : null;
        const nativeNames = data.name.nativeName;
        const nativeNameKeys = Object.keys(nativeNames);
        const primaryNativeName =
          nativeNameKeys.length > 0 ? nativeNameKeys[0] : null;

        setFull(data.name.nativeName[primaryNativeName].official);
        setCapital(data.capital[0]);
        setCurrency(primaryCurrency);
        setPopulation(data.population);
        setSize(data.area);
        setContinent(data.continents[0]);
        setResultFlag(data.flags.svg);
        setSearch(false);
      } catch {
        toast.error("You typed incorrect name of country.");
      }
    }
  };

  const contextValue: CountryContextProps = {
    search,
    full,
    capital,
    currency,
    population,
    size,
    continent,
    resultFlag,
    searchCountry,
  };

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};
