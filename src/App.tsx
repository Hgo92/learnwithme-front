import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import HomeLogged from "./pages/HomeLogged";
import Decks from "./pages/Decks";
import Play from "./pages/Play";

import "./App.css";
import { RouteProtection } from "./components/authentication/RouteProtection";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<RouteProtection />}>
            <Route path="/home" element={<HomeLogged />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/play" element={<Play />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
