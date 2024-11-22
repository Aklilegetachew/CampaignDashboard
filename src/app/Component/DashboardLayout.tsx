"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const currentTime = Date.now() / 1000;
        const decoded: any = jwtDecode(token);

        if (decoded.exp < currentTime) {
          Cookies.remove("token");
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("token");
      }
    } else {
      console.error("Invalid token:");
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar user={user} />
      <div className="flex flex-col w-full">
        <Header user={user} />
        <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
