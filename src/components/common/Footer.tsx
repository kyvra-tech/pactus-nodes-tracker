// import { Link } from "react-router-dom";
import Container from "../shared/Container";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
     <footer className="bg-gray-900 text-slate-400 mt-20">
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <img
                      src="/logos/ptn.svg"
                      alt="Logo"
                      className="w-6 h-6 object-cover"
                    />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Pactus Nodes Tracker
                  </span>
                </div>
                <p className="text-gray-400 max-w-sm">
                  Monitor and explore the global network of Pactus blockchain nodes with real-time data and analytics.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Peer Nodes</a></li>
                  <li><a href="/bootstrap-node" className="text-gray-400 hover:text-white transition-colors">Bootstrap Nodes</a></li>
                  <li><a href="/grpc" className="text-gray-400 hover:text-white transition-colors">GRPC</a></li>
                  <li><a href="/json-rpc" className="text-gray-400 hover:text-white transition-colors">JSON RPC</a></li>
                </ul>
              </div>

              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Powered by</h3>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Kyvra Tech</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Building the future of blockchain infrastructure
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <div className="text-center md:text-left">
                &copy; {currentYear} Pactus Node Tracker. All rights reserved.
              </div>
              <div className="text-center md:text-right text-gray-500">
                Built with ❤️ by Kyvra Tech
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
