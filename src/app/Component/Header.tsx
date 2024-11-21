"use client";

import React, {useState} from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Dashboard</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
        />
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">User</span>
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
