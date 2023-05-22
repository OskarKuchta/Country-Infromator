import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Flag from "./components/Flags";
import Button from "./components/Button";
import Describe from "./components/Describe";
const App = () => {
  const [search, setSearch] = useState(true);
  const searchCountry = () => {
    setSearch(false);
  };
  const reloadPage = () => {
    return location.reload();
  };
  return (
    <>
      {search ? (
        <div className="container">
          <Header>Search data about country!</Header>
          <Input />
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
            <Button onClick={reloadPage}>Search another!</Button>
            </div>
            <div className="right">
            <Describe />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default App;
