import "./NavItem.css";
import { Link } from "react-router-dom";

interface Props {
  href: string;
  text: string;
  style?: string;
  setActiveItem: () => void;
}

const NavItem: React.FC<Props> = ({ href, text, style, setActiveItem }) => {
  return (
    <Link
      to={href}
      className={`duration-300 font-medium ease-linear hover:text-primary py-3 ${style}`}
      onClick={setActiveItem}
    >
      {text}
    </Link>
  );
};

export default NavItem;
