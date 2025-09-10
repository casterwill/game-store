import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto"></div>
      <div className="navbar shadow-sm bg-base-100 px-50 justify-between">
        <div className="flex-1 lg:flex-none">
          <label className="input input-neutral gap-2 px-3 py-1">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-1">
          <Link to="/signin" className="btn btn-outline btn-success">
            sign in
          </Link>
          <Link to="/signup" className="btn btn-active btn-success">
            sign up
          </Link>

          {/* <button className="btn btn-outline btn-success">sign in</button>
          <button className="btn btn-active btn-success">sign up</button> */}
        </div>
      </div>
    </div>
  );
}
