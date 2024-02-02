import { useInputContext } from "../../context/InputContext";

const SearchedHeader: React.FC = () => {
  const { inputValue } = useInputContext();
  return (
    <h2 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl xl:text-4xl transition duration-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-600 ">
      {inputValue
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")}
    </h2>
  );
};

export default SearchedHeader;
