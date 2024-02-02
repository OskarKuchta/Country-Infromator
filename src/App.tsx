import MainPage from "./components/SearchCountry/MainPage";
import SearchedCountry from "./components/SearchedCountry/SearchedCountry";
import { useCountryContext } from "./context/CountryContext";

const App: React.FC = () => {
  const { search } = useCountryContext();

  return <>{search ? <MainPage /> : <SearchedCountry />}</>;
};

export default App;
