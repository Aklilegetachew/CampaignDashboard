"use client";

import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
