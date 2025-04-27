import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  style?: string;
}

const Container: React.FC<Props> = ({ children, style }) => {
  return (
    <div
      className={`mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 ${style}`}
    >
      {children}
    </div>
  );
};

export default Container;
