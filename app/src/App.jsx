import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Flag from "./components/Flags";
import Button from "./components/Button";
import Describe from "./components/Describe";
import countriesData from "./assets/countries.json";
const App = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(true);
  const [full, setFull] = useState("");
  const [capital, setCapital] = useState("");
  const [currency, setCurrency] = useState("");
  const [population, setPopulation] = useState("");
  const [size, setSize] = useState("");
  const [currentSrc, setCurrentSrc] = useState(0);
  const [continent, setContinent] = useState("");
  const [resultFlag, setResultFlag] = useState("");
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const timeRef = useRef(null);
  const regex = /[^\w\s]/g;
  const flags = [
    "./poland.png",
    "./germany.png",
    "./usa.png",
    "./australia.png",
    "./bulgaria.png",
    "./france.png",
  ];
  const [src, setSrc] = useState(flags[currentSrc]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSrc(Math.floor(Math.random() * 5));
      setSrc(flags[currentSrc]);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSrc]);
  const getValue = (event) => {
    setValue(event.target.value);
  };
  const searchCountry = async () => {
    if (value.trim() == "") {
      alert("You forgot type country name!");
    } else if (value.match(regex)) {
      alert("Invalid format typed!");
    } else {
      const accessToken = "244|Tf5Vk9IavLcl56sLpSw15DwgxiwoonCEmv0Mz5xn";
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await fetch(
          `https://restfulcountries.com/api/v1/countries/${value}`,
          requestOptions
        );
        const nestedData = await response.json();
        const data = nestedData.data;
        setFull(data.full_name);
        setCapital(data.capital);
        setCurrency(data.currency);
        setPopulation(data.population);
        setSize(data.size);
        setContinent(data.continent);
        setResultFlag(data.href.flag);
        setSearch(false);
        timeRef.current = new Date().toLocaleDateString(undefined, options);
      } catch {
        if (value.length < 3) {
          alert("Country name is so short!");
        } else {
          try {
            const data = countriesData;
            const matchingValue = Object.values(data).find((val) => val.toLowerCase().includes(value.toLowerCase())
            );
            if (matchingValue) {
              alert(`Maybe you meant about ${matchingValue}!`);
            } else {
              alert("You type wrong country name!");
            }
          } catch {
            console.log((error) => error);
          }
        }
      }
    }
  };
  const reloadPage = () => {
    return location.reload();
  };
  return (
    <>
      {search ? (
        <div className="container">
          <Header>Search data about country!</Header>
          <Input onChange={getValue} onClick={searchCountry} />
          <Flag src={src} />
          <Button onClick={searchCountry}>Confirm</Button>
        </div>
      ) : null}
      {!search ? (
        <>
          <div className="result">
            <div className="left">
              <Header>
                {value.substring(0, 1).toUpperCase()}
                {value.substring(1).toLowerCase()}
              </Header>
              <Flag src={resultFlag} />
              <h2 className="mt-3 lg:mt-7 font-bold text-gray-800 text-xs sm:text-sm md:text-lg text-center">
                Current info on: {timeRef.current}
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
