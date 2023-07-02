const Button = ({onClick, children}) => {
  return (
    <button onClick={onClick}
    className="mt-5 mb-10 inline-flex items-center justify-center rounded-xl bg-gray-800 py-3 px-10 sm: px-20  font-dm text-base font-medium text-white shadow-xl shadow-gray-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
      {children}
    </button>
  );
};
export default Button;
