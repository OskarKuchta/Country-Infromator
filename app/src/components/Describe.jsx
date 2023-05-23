const Describe = ({children}) => {
  return (
    <>
      <h2 className="mt-5 sm:mb-3 md:mb-6 lg:mb-10 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col">
        {children} 
      </h2>
    </>
  );
};

export default Describe;
