import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import HomeLogged from "./pages/HomeLogged";
import Decks from "./pages/Decks";
import Play from "./pages/Play";

import "./App.css";
import { RouteProtection } from "./components/authentication/RouteProtection";
import { HomeProtection } from "./components/authentication/HomeProtection";
import Footer from "./components/Footer";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<HomeProtection />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RouteProtection />}>
              <Route path="/home" element={<HomeLogged />} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/play" element={<Play />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </SnackbarProvider>
    </>
  );
}

export default App;
