import { useEffect } from "react";
import { useCountryData } from "./Hooks/useCountryData";
import MainPage from "./components/SearchCountry/MainPage";
import SearchedCountry from "./components/SearchedCountry/SearchedCountry";

const App: React.FC = () => {
  const { search } = useCountryData();
  useEffect(() => {
    console.log("Search state has changed:", search);
  }, [search]);

  return <>{search ? <MainPage /> : <SearchedCountry />}</>;
};

export default App;
