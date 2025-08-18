import React from "react";

export default function GameCard() {
  return (
    <div className="flex flex-col h-64 w-48 border rounded-xl shadow-lg bg-gray-800 overflow-hidden">
        <img src="/game-cover.jpg" alt="Game Cover" className="w-full h-2/3 object-cover"/>
        <div className="p-2 text-white">
          <h3 className="text-sm font-bold">Game Title</h3>
          <p className="text-xs text-gray-300">Genre</p>
          <h2 className="text-xl font-bold">$16</h2>
        </div>  
    </div>
  );
} 