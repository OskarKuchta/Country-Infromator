const Header = ({children}) => {
  return (
    <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl xl:text-4xl transition duration-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-600 ">
      {children}
    </h1>
  );
};

export default Header;
