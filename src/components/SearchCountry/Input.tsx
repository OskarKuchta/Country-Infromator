import { BsSearch, BsX } from "react-icons/bs";
import { ChangeEvent } from "react";
import { useInputContext } from "../../context/InputContext";
import { InputProps } from "../../Types";

const Input: React.FC<InputProps> = ({ onClick }) => {
  const { inputValue, setInputValue } = useInputContext();

  const getValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const resetValue = () => {
    setInputValue("");
  };

  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div className="relative mt-5 text-gray-600 focus-within:text-gray-400 type-country">
      <button
        onClick={handleButtonClick}
        className="absolute inset-y-0 left-0 flex items-center px-2 focus:outline-none focus:shadow-outline hover:bg-white focus:bg-white hover:rounded-bl focus:rounded-bl hover:rounded-tl focus:rounded-tl"
      >
        <BsSearch />
      </button>

      <input
        onChange={getValue}
        value={inputValue}
        name="q"
        className="w-full py-2 pl-10 text-sm text-white bg-gray-900 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
        id="search-input"
        placeholder="Search..."
        autoComplete="off"
      />
      {inputValue.length >= 1 ? (
        <button
          onClick={resetValue}
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none focus:shadow-outline hover:bg-white focus:bg-white hover:rounded-br focus:rounded-br hover:rounded-tr focus:rounded-tr"
        >
          <BsX />
        </button>
      ) : null}
    </div>
  );
};

export default Input;
