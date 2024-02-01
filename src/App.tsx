import { useEffect, useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Flag from "./components/Flags";
import Button from "./components/Button";
import Describe from "./components/Describe";
import { useInputContext } from "./context/InputContext";
import { Country } from "./Types";

const App: React.FC = () => {
  const [search, setSearch] = useState<boolean>(true);
  const [full, setFull] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [population, setPopulation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [currentSrc, setCurrentSrc] = useState<number>(0);
  const [continent, setContinent] = useState<string>("");
  const [resultFlag, setResultFlag] = useState<string>("");
  const { inputValue } = useInputContext();

  const regex: RegExp = /[^\w\s]/g;
  const flags: string[] = [
    "./poland.png",
    "./germany.png",
    "./usa.png",
    "./australia.png",
    "./bulgaria.png",
    "./france.png",
  ];
  const [src, setSrc] = useState<string>(flags[currentSrc]);
  useEffect(() => {
    const interval: number = setInterval(() => {
      setCurrentSrc(Math.floor(Math.random() * 5));
      setSrc(flags[currentSrc]);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSrc]);
  const searchCountry: () => Promise<void> = async () => {
    if (inputValue.trim() == "") {
      alert("You forgot type country name!");
    } else if (inputValue.match(regex)) {
      alert("Invalid format typed!");
    } else {
      try {
        const response: Response = await fetch(
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
        console.log(data.name.nativeName[primaryNativeName].official);
        setFull(data.name.nativeName[primaryNativeName].official);
        setCapital(data.capital[0]);
        setCurrency(primaryCurrency);
        setPopulation(data.population);
        setSize(data.area);
        setContinent(data.continents[0]);
        setResultFlag(data.flags.svg);
        setSearch(false);
      } catch {
        if (inputValue.length <= 3) {
          alert("Country name is so short!");
        }
      }
    }
  };
  const reloadPage: () => void = () => {
    return location.reload();
  };
  return (
    <>
      {search ? (
        <div className="container">
          <Header>Search data about country!</Header>
          <Input onClick={searchCountry} />
          <Flag src={src} />
          <Button onClick={searchCountry}>Confirm</Button>
        </div>
      ) : null}
      {!search ? (
        <>
          <div className="result">
            <div className="left">
              <Header>
                {inputValue
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </Header>
              <Flag src={resultFlag} />
              <h2 className="mt-3 lg:mt-7 font-bold text-gray-800 text-xs sm:text-sm md:text-lg text-center">
                This is not actuall country informations. No one API's have
                actuall data about countries.
              </h2>
            </div>
            <div className="right">
              <Describe className="full-name">Full name: {full}</Describe>
              <Describe>Capital: {capital}</Describe>
              <Describe>Currency: {currency}</Describe>
              <Describe>Population: {population}</Describe>
              <Describe>Size: {size}</Describe>
              <Describe>Continent: {continent}</Describe>
              <Button onClick={reloadPage}>Search another!</Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default App;
