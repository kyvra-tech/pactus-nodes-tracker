import { Link } from "react-router-dom";
import Container from "../shared/Container";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 dark:bg-gray-900 mt-16 pt-2">
      <div className="py-6 relative">
        <Container>
          <div className="flex justify-between items-center gap-6 md:text-sm text-slate-400">
            <div>
              &copy; <span id="year"></span> Pactus Node Tracker. All right
              reserved
            </div>
            <div>
              <Link to="/">Nafsi Labs</Link>
              &nbsp;&nbsp;{currentYear}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
