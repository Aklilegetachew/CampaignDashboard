"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/axios/axiosInstance";

export default function Component() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("Defualt");
  const [referralCode, setReferralCode] = useState("Defualt");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  

    try {
      if (isLogin) {
        const response = await axiosInstance.post(`/Employee/login`, {
          username,
          password,
        });
        const { token, message } = response.data;

        // Decode JWT to extract user information
        const decodedToken = jwtDecode(token);

        // Save token securely in cookies
        Cookies.set("token", token, { secure: true, sameSite: "strict" });

        toast.success(message, { autoClose: 2000 });

        // Navigate to the dashboard or another page
        setTimeout(() => {
          router.push("/Dashbored");
        }, 2000);
      } else {
        const response = await axiosInstance.post(`/Employee/signup`, {
          id: 0,
          name,
          employeeId,
          employeCode: employeeCode,
          username,
          password,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          referralCode,
          referralCount: 0,
          totalRevenue: 0,
          RoleType: "employee",
        });

        const { message } = response.data;

        toast.success(message, { autoClose: 2000 });

        // Navigate to login page after signup
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg, { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 p-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Coffee className="h-12 w-12 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="employeeId"
                    className="text-sm font-medium text-gray-700"
                  >
                    Employee ID
                  </Label>
                  <Input
                    id="employeeId"
                    placeholder="EMP12345"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-amber-600 hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
