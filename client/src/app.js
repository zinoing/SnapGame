import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameFeedPage from "./pages/GameFeedPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/game-feed" element={<GameFeedPage />} />
        <Route path="/leader-board" element={<div>Leaderboard Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
