import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container: React.FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
