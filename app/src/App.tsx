import { useEffect, useState, useRef, ChangeEvent } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Flag from "./components/Flags";
import Button from "./components/Button";
import Describe from "./components/Describe";
import countriesData from "./assets/countries.json";
const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState<boolean>(true);
  const [full, setFull] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [population, setPopulation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [currentSrc, setCurrentSrc] = useState<number>(0);
  const [continent, setContinent] = useState<string>("");
  const [resultFlag, setResultFlag] = useState<string>("");

  interface Options {
    weekday?: "long" | "short" | "narrow";
    era?: "long" | "short" | "narrow";
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
    day?: "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    second?: "numeric" | "2-digit";
    timeZoneName?: "long" | "short";
    hour12?: true | false;
  }
  interface RequestOptions {
    headers: {
      Authorization: string;
    };
  }

  const options: Options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const timeRef = useRef<string | null>(null);
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
  const getValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const searchCountry: () => Promise<void> = async () => {
    if (value.trim() == "") {
      alert("You forgot type country name!");
    } else if (value.match(regex)) {
      alert("Invalid format typed!");
    } else {
      const accessToken: string =
        "244|Tf5Vk9IavLcl56sLpSw15DwgxiwoonCEmv0Mz5xn";
      const requestOptions: RequestOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response: Response = await fetch(
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
        if (value.length <= 2) {
          alert("Country name is so short!");
        } else {
          try {
            const data: { [key: string]: string } = countriesData;
            const matchingValue: string = Object.values(data).find((val) =>
              val.toLowerCase().includes(value.toLowerCase())
            );
            if (matchingValue) {
              alert(`Maybe you meant about ${matchingValue}!`);
            } else {
              alert("You type wrong country name!");
            }
          } catch (error) {
            console.log(error);
          }
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
                {value
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
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
