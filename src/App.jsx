// src/App.jsx (ejemplo)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AgendasPage from "./pages/AgendasPage";
import ChildrenList from "./components/ChildrenList";
import MusicList from "./components/MusicList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agendas" element={<AgendasPage />} />
          <Route path="children" element={<ChildrenList />} />
          <Route path="music" element={<MusicList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
