import Navbar from "./components/game-list/navbar.jsx";

import GameStore from "./pages/GameStorePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <Routes>
        <Route path="/" element={<GameStore />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
