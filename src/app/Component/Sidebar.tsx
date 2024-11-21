"use client";
import React, { useState } from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-auto bg-gray-900 text-white transition-all duration-300`}
    >
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
        <span className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>
          Menu
        </span>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none focus:ring"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>
      <nav className="flex flex-col mt-4">
        <Link href="/Dashbored">
          <div className="px-4 py-2 hover:bg-gray-700">
            {isOpen ? "Dashboard" : "→"}
          </div>
        </Link>
        <Link href="/Employees">
          <div className="px-4 py-2 hover:bg-gray-700">
            {isOpen ? "Employee Statistics" : "→"}
          </div>
        </Link>
        <Link href="/Customers">
          <div className="px-4 py-2 hover:bg-gray-700">
            {isOpen ? "User Activity" : "→"}
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
