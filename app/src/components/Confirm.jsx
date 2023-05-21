const Confirm = ({onClick}) => {
  return (
    <button onClick={onClick}
    className="mt-8 inline-flex items-center justify-center rounded-xl bg-gray-800 py-3 px-8 sm: px-20  font-dm text-base font-medium text-white shadow-xl shadow-gray-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
      Confirm
    </button>
  );
};
export default Confirm;
