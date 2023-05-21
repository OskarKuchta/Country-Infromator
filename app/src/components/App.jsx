import { useState } from "react";
import Header from "./Header";
import Input from "./Input";
import Flag from "./Flags";
import Confirm from "./Confirm";
const App = () => {
  const [search, setSearch] = useState(true);
  const searchCountry = () => {
    setSearch(false);
  }
  return ( <>
  {search ? (
    <div className="container">
      <Header />
      <Input />
      <Flag />
      <Confirm onClick={searchCountry}/>
      </div>
      ) : null
    }
    {!search ? (
      <div className="result">
        <Flag />
      </div>
    ) : null}
  </>
  )
  };

export default App;
