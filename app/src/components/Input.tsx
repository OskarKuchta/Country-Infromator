import { ChangeEvent } from 'react';
interface InputProps {
  onClick: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ onChange, onClick }) => {
  return (
    <div className="relative mt-5 text-gray-600 focus-within:text-gray-400 type-country">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          onClick={onClick}
          type="submit"
          className="p-1 focus:outline-none focus:shadow-outline"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        onChange={onChange}
        type="search"
        name="q"
        className="w-full py-2 pl-10 text-sm text-white bg-gray-900 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
        id="search-input"
        placeholder="Search..."
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
