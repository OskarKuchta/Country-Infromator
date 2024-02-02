import { useState } from "react";
import { useInputContext } from "../context/InputContext";
import { Country } from "../Types";

export const useCountryData = () => {
  const { inputValue } = useInputContext();
  const [search, setSearch] = useState<boolean>(true);
  const [full, setFull] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [population, setPopulation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [continent, setContinent] = useState<string>("");
  const [resultFlag, setResultFlag] = useState<string>("");



  const regex: RegExp = /[^\w\s]/g;
  const searchCountry = async () => {
    if (inputValue.trim() === "") {
      alert("You forgot to type the country name!");
      return;
    } else if (inputValue.match(regex)) {
      alert("Invalid format typed!");
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
      } catch (error) {
        console.error("Error fetching data:", error);
        if (inputValue.length <= 3) {
          alert("Country name is too short!");
        } else {
          alert("Error fetching data. Please try again later.");
        }
      }
      finally {
        setSearch(false);
      }
    }
  };

  return {
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
};
