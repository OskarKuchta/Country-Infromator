import { useCountryContext } from "../../context/CountryContext";
import Flag from "../Flags";
import SearchedHeader from "./Header";

const SearchedCountry = () => {
  const { full, capital, currency, population, size, continent, resultFlag } =
  useCountryContext();

  const reloadPage = () => {
    return location.reload();
  };
  return (
    <>
      <div className="result">
        <div className="left">
          <SearchedHeader />
          <Flag src={resultFlag} />
          <h2 className="mt-3 lg:mt-7 font-bold text-gray-800 text-xs sm:text-sm md:text-lg text-center">
            This is not actuall country informations. No one API's have actuall
            data about countries.
          </h2>
        </div>
        <div className="right">
          <p className="mt-3 sm:mb-3 md:mb-5 lg:mb-7 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col text-center md:text-left">
            Native name: {full}
          </p>
          <p className="mt-3 sm:mb-3 md:mb-5 lg:mb-7 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col text-center md:text-left">
            Capital: {capital}
          </p>
          <p className="mt-3 sm:mb-3 md:mb-5 lg:mb-7 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col text-center md:text-left">
            Currency: {currency}
          </p>
          <p className="mt-3 sm:mb-3 md:mb-5 lg:mb-7 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col text-center md:text-left">
            Population:{" "}
            {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="mt-3 sm:mb-3 md:mb-5 lg:mb-7 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col text-center md:text-left">
            Size: {size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km
            <sup>2</sup>
          </p>
          <p className="mt-3 sm:mb-3 md:mb-5 lg:mb-7 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col text-center md:text-left">
            Continent: {continent}
          </p>
          <button
            className="mt-5 mb-10 inline-flex items-center justify-center rounded-xl bg-gray-800 py-3 px-10 sm:px-20  font-dm text-base font-medium text-white shadow-xl shadow-gray-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-white hover:text-gray-800 focus:bg-white focus:text-gray-800"
            onClick={reloadPage}
          >
            Search another!
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchedCountry;
