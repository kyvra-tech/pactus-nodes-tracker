import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import PeerNodes from "./pages/PeerNodes";
import BootstrapNodeHealth from "./pages/BootstrapNodeHealth";
import GRPC from "./pages/GRPC";
import JsonRPC from "./pages/JsonRPC";
import NodeRegistration from "./pages/NodeRegistration";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PeerNodes />} />
            <Route path="bootstrap-node" element={<BootstrapNodeHealth />} />
            <Route path="grpc" element={<GRPC />} />
            <Route path="json-rpc" element={<JsonRPC />} />
            <Route path="register" element={<NodeRegistration />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;