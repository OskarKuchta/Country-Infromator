type FlagProps = {
  src: string;
};

const Flag: React.FC<FlagProps> = ({ src }) => {
  return <img src={src} className="mt-7" />;
};

export default Flag;
