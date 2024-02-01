import { DescribeProps } from "../Types";

const Describe: React.FC<DescribeProps> = ({ children }) => {
  return (
    <>
      <h2 className="mt-3 sm:mb-3 md:mb-5 lg:mb-7 md:mt-0 text-xl font-bold  text-gray-800 sm:text-2xl xl:text-3xl flex-col text-center md:text-left">
        {children}
      </h2>
    </>
  );
};

export default Describe;
