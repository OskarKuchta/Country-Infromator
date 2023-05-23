import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Flag from "./components/Flags";
import Button from "./components/Button";
import Describe from "./components/Describe";
const App = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(true);
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  const time = new Date().toLocaleDateString(undefined, options);
  const getValue = (event) => {
    setValue(event.target.value)
    console.log(value)
  }
  const searchCountry = () => {
    setSearch(false);
    console.log(value)
  };
  const reloadPage = () => {
    return location.reload();
  };
  
  return (
    <>
      {search ? (
        <div className="container">
          <Header>Search data about country!</Header>
          <Input onChange={getValue} onClick={searchCountry}/>
          <Flag />
          <Button onClick={searchCountry}>Confirm</Button>
        </div>
      ) : null}
      {!search ? (
        <>
          <div className="result">
            <div className="left">
              <Header>Country name</Header>
              <Flag />
              <h2 className="mt-3 md:mt-7 font-bold text-gray-800 text-xs sm:text-sm md:text-lg">Current data on: {time}</h2>
            </div>
            <div className="right flex flex-col">
              <Describe>
              Capital: Warsaw
              </Describe>
              <Describe>
              Population: 100 000 000
              </Describe>
              <Describe>
              Language: Polish
              </Describe>
              <Describe>
              Continent: Europe
              </Describe>
              <Button onClick={reloadPage}>Search another!</Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default App;
