import { useEffect } from "react";
import GameCard from "../components/game-list/game-card.jsx";
import { useGamesStore } from "../store/useGamesStore.js";
import { Link } from "react-router";

function GameStorePage() {
  const { games, loading, error, fetchGames } = useGamesStore();

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {error && <div className="alert alert-error mb-8">{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="py-10 grid grid-cols-5 gap-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">
          {games.map((game) => (
            <Link key={game.id} to={`/game/${game.id}`}>
              <GameCard Game={game} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default GameStorePage;
