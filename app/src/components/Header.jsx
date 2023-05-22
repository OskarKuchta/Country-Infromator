const Header = ({children}) => {
  return (
    <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl xl:text-4xl ">
      {children}
    </h1>
  );
};

export default Header;
