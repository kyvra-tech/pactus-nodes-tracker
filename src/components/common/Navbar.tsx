import { useEffect, useState } from "react";
import Container from "../shared/Container";
import NavItem from "../shared/NavItem";
import { setTheme, getInitialTheme } from "../../utils/theme";
import ThemeToggle from "../shared/ThemeToggle";

const navItems = [
  { href: "/", text: "Peer Nodes" },
  { href: "/bootstrap-node", text: "Bootstrap Nodes" },
];

const Navbar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="py-4 border-b border-gray-200 dark:border-gray-700 bg-body relative z-50">
      <Container>
        <nav className="flex justify-between items-center relative">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full">
                <img
                  src="./logos/ptn.svg"
                  alt="Logo"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <span className="text-xl font-semibold text-heading-1 dark:text-white">
                Pactus Nodes Tracker
              </span>
            </a>
          </div>

          {/* DESKTOP NAVBAR ITEMS */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <ul className="flex items-center gap-6 text-lg font-medium text-gray-600 dark:text-gray-300">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  {...item}
                  setActiveItem={() => setSelectedItem(index)}
                  style={
                    index === selectedItem
                      ? "text-blue-500 dark:text-blue-400 font-semibold"
                      : "hover:text-blue-400 transition"
                  }
                />
              ))}
            </ul>
          </div>

          {/* THEME TOGGLE */}
          <div className="hidden lg:flex items-center gap-4 relative">
            <ThemeToggle isDarkmode={isDarkMode} toggleTheme={toggleTheme} />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col items-center justify-center gap-1"
            aria-label="Toggle Navigation"
          >
            <span
              className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded ${
                isMenuOpen ? "opacity-0" : ""
              } transition-opacity`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-300 rounded transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 transition-all ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`bg-white dark:bg-gray-800 w-3/4 h-full p-6 transition-transform ${
              isMenuOpen
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
          >
            <ul className="flex flex-col text-lg font-medium text-gray-600 dark:text-gray-300">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  {...item}
                  setActiveItem={() => setSelectedItem(index)}
                  style={
                    index === selectedItem
                      ? "text-blue-500 dark:text-blue-400 font-semibold"
                      : "hover:text-blue-400 transition"
                  }
                />
              ))}
            </ul>
            <div className="mt-6">
              <div className="mt-6">
                <ThemeToggle
                  isDarkmode={isDarkMode}
                  toggleTheme={toggleTheme}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
