import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  style?: string;
}

const Title: React.FC<Props> = ({ children, style }) => {
  return (
    <h1
      className={`text-heading-1 font-semibold text-2xl sm:text-3xl md:text-4xl ${style}`}
    >
      {children}
    </h1>
  );
};

export default Title;
