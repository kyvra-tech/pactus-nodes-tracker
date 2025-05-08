import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import PeerNodes from "./pages/PeerNodes";
import BootstrapNodeHealth from "./pages/BootstrapNodeHealth";
import GRPC from "./pages/GRPC";
import JsonRPC from "./pages/JsonRPC";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PeerNodes />} />
          <Route path="bootstrap-node" element={<BootstrapNodeHealth />} />
          <Route path="grpc" element={<GRPC />} />
          <Route path="json-rpc" element={<JsonRPC />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
