"use client";
import React, { useState } from "react";
import Link from "next/link";

interface User {
  EmployeeId: string;
  Name: string;
  ReferenceCode: string;
  ReferenceCount: string;
  Revenue: string;
  Role: "admin" | "employee";
  aud: string;
  exp: number;
  iss: string;
  sub: string;
}

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
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
        {user.Role === "admin" ? (
          <>
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
          </>
        ) : user.Role === "employee" ? (
          <Link href="/MyState">
            <div className="px-4 py-2 hover:bg-gray-700">
              {isOpen ? "My State" : "→"}
            </div>
          </Link>
        ) : (
          <div className="px-4 py-2 text-gray-500">
            {isOpen ? "No Access" : "→"}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
