import { FlagProps } from "../Types";

const Flag: React.FC<FlagProps> = ({ src }) => {
  return <img src={src} className="mt-7" />;
};

export default Flag;
