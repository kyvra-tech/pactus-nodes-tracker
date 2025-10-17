import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../shared/Container";
import NavItem from "../shared/NavItem";
import { setTheme, getInitialTheme } from "../../utils/theme";
// import ThemeToggle from "../shared/ThemeToggle";

const navItems = [
  { href: "/", text: "Peer Nodes" },
  { href: "/bootstrap-node", text: "Bootstrap Nodes" },
  { href: "/grpc", text: "GRPC" },
  { href: "/json-rpc", text: "JSON RPC" },
];

const NavBar: React.FC = () => {
  const isDarkMode = getInitialTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setTheme(isDarkMode);
  }, [isDarkMode]);

  // const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
    <Container>
      <nav className="flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
            <img
              src="/logos/ptn.svg"
              alt="Logo"
              className="w-8 h-8 object-cover"
            />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            Pactus Nodes Tracker
          </span>
        </a>
          {/* End Logo */}

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center space-x-8 text-md font-bold">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={location.pathname === item.href}
              />
            ))}
          </ul>

          {/* Theme & Hamburger */}
          <div className="flex items-center lg:gap-4 gap-2">
            {/* <ThemeToggle isDarkmode={isDarkMode} toggleTheme={toggleTheme} /> */}
            <button
              onClick={toggleMenu}
              className="lg:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 rounded shadow-lg mt-2 px-6 py-4 space-y-4">
            <ul className="flex flex-col gap-3 text-md font-medium">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  isActive={location.pathname === item.href}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </ul>
            {/* <div className="pt-2">
              <ThemeToggle isDarkmode={isDarkMode} toggleTheme={toggleTheme} />
            </div> */}
          </div>
        )}
      </Container>
    </header>
  );
};

export default NavBar;
