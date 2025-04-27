interface Props {
  style?: string;
}

const HorizontalRule: React.FC<Props> = ({ style }) => {
  return <hr className={`bg-gray-200 border-0 dark:bg-gray-800 ${style}`} />;
};

export default HorizontalRule;
