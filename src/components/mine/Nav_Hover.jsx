import { useState } from "react";


// hovered one stays same while others opacity is decreased
export default function Nav_Hover() {

  const navItems = ["Progress Indicator", "Browsing Tutorial", "Filter & Sorting", "Subscription & Paywall", "Creating account"];

  const [activeNav, setActiveNav] = useState("");

  return (
    <div className=" flex justify-center items-center bg-gray-600 rounded-2xl">
      <nav
        className="flex flex-col w-fit gap-2 bg-neutral-700/80  rounded-lg px-28 py-14"
      >
        <h1
          className={`text-5xl font-bold text-yellow-500/70 text-center border-b-2 mb-4`}
        >
          Hover Animation
        </h1>
        {navItems.map((item, index) => (
          <span
            key={index}
            onMouseEnter={() => setActiveNav(item)}
            className={`
              ${
                !activeNav || activeNav === item
                  ? "text-white"
                  : "text-gray-500"
              }
              text-3xl font-semibold text-center px-4 py-2 cursor-pointer transition-colors duration-300`}
            onMouseLeave={() => setActiveNav("")}

          >
            {item}
          </span>
        ))}
      </nav>
    </div>
  );
}
