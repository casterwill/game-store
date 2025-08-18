import Image from "next/image";

import GameCard from "../../components/game-card";

export default function Home() {
  return (
    <div className="justify-items-center">
      <div className="grid grid-cols-5 gap-4 ms-8">
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </div>
  );
}