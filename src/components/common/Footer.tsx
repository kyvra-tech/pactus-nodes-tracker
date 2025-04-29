// import { Link } from "react-router-dom";
import Container from "../shared/Container";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-slate-400 mt-20 pt-10 pb-6">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          {/* Left */}
          <div className="text-center md:text-left">
            &copy; {currentYear}{" "}
            <span className="font-semibold text-white">
              Pactus Node Tracker
            </span>
            . All rights reserved.
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            Powered by{" "}
            {/* <Link
              to="/"
              className="text-slate-200 hover:text-white underline underline-offset-2 transition"
            > */}
            <span className="font-semibold text-white">Nafsi Labs</span>
            {/* </Link> */}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
