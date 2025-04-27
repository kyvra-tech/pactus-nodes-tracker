import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<Props> = ({ children, className }) => {
  return (
    <p className={`md:text-md dark:text-gray-300 ${className}`}>{children}</p>
  );
};

export default Paragraph;
