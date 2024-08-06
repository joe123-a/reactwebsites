import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex justify-between items-center  h-24 max-w-[1240px] mx-auto px-4 ">
      <h1 className=" m-4 w-full text-3xl font-bold text-orange-600">
        Ocular Test Demo
      </h1>
      <ul className="hidden md:flex">
        <li className="p-4 hover:bg-[#ea580c] font-bold">
          {" "}
          <a href="#home">Home</a>
        </li>
        <li className="p-4">
          <a href="#features">Features</a>
        </li>
        <li className="p-4">
          {" "}
          <a
            href="
        #about"
          >
            {" "}
            About
          </a>
        </li>
        <li className="p-4">
          {" "}
          <a href="#help">Help</a>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#f0f1f0] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul className="uppercase pt-24 ">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Features</li>
          <li className="p-4 border-b border-gray-600">About</li>
          <li className="p-4">Help</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
