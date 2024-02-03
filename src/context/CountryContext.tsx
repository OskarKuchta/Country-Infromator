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

  const fetchData = async () => {
    const response = await fetch(
      "https://country-informator.netlify.app/.netlify/functions/server/getInfo"
    );
    const nestedData = await response.json();
    return nestedData;
  };
  const fetchListOfCountries = async () => {
    try {
      const data = await fetchData();
      const list = data.map((item: any) => item.name.common);
      return list;
    } catch {
      console.log("Error with fetch countries");
    }
  };

  const searchCountry = async () => {
    if (inputValue.trim() === "") {
      toast.error("You forgot to type the country name!");
      return;
    } else if (inputValue.length <= 3) {
      toast.error("Country name is too short!");
      return;
    } else {
      try {
        const nestedData = await fetchData();
        const data = nestedData.find(
          (item: Country) =>
            item.name.common.toLowerCase() === inputValue.toLowerCase()
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
    fetchListOfCountries,
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
