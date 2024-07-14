import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="flex items-center justify-between mycontainer h-12 px-4 py-7">
        <div className="logo font-bold text-white text-2xl">
            <span className="text-green-700"> &lt;</span>
            Passward Manager
            <span className="text-green-700">/ &gt; </span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className=" relative cursor-pointer hover:opacity-50">
            <img className="invert w-14 " src="/icons/github.svg" alt="Github logo" />
            <div className="absolute -bottom-1 left-2.5 font-bold text-xs">GitHub</div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
