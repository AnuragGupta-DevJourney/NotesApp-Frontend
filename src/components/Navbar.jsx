import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-[#110D0C] text-blue-600 content-full py-4">
      <nav className="flex justify-between content-wrapper">
        <div>
          <h1 className="text-3xl font-bold text-white">&lt;NotesApp/&gt;</h1>
        </div>
        <div>
          <Link
            to={"/create"}
            className="flex gap-1.5 items-center justify-center bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            <FaPlus fontSize={16} />
            New Note
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
