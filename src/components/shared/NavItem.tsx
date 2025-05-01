import { Link } from "react-router-dom";

interface Props {
  href: string;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<Props> = ({ href, text, isActive, onClick }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`py-2 transition-colors duration-200 ${
        isActive
          ? "text-blue-600 dark:text-blue-400 font-semibold"
          : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
      }`}
    >
      {text}
    </Link>
  );
};

export default NavItem;
