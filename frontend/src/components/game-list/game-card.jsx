export default function GameCard({ Game }) {
  return (
    <div className="card bg-base-100 w- shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold text-2xl">{Game.title}</h2>
        <p>{Game.genre}</p>
        <h3 className="text-md font-bold">{Game.price}</h3>
      </div>
    </div>
  );
}
