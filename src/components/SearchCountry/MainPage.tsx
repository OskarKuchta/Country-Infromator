import Input from "./Input";
import Flag from "../Flags";
import { useCountryData } from "../../Hooks/useCountryData";
import { useEffect, useState } from "react";

const MainPage: React.FC = () => {
  const { searchCountry } = useCountryData();
  const flags: string[] = [
    "./poland.png",
    "./germany.png",
    "./usa.png",
    "./australia.png",
    "./bulgaria.png",
    "./france.png",
  ];
  const [currentSrc, setCurrentSrc] = useState<number>(0);
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
  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl xl:text-4xl transition duration-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-600">
        Search data about the country!
      </h1>
      <Input onClick={searchCountry} />
      <Flag src={src} />
      <button
        className="mt-5 mb-10 inline-flex items-center justify-center rounded-xl bg-gray-800 py-3 px-10 sm:px-20 font-dm text-base font-medium text-white shadow-xl shadow-gray-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-white hover:text-gray-800 focus:bg-white focus:text-gray-800"
        onClick={searchCountry}
      >
        Confirm
      </button>
    </div>
  );
};

export default MainPage;
