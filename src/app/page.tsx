"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import axios from "axios";

export default function Component() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = "https://aspbackend.tomocacloud.com/api/User"; 

    try {
      if (isLogin) {
        const response = await axios.post(`${apiUrl}/login`, {
          email,
          password,
        });
        console.log("Login successful", response.data);
      } else {
        const response = await axios.post(`${apiUrl}/signup`, {
          name,
          email,
          password,
        });
        console.log("Signup successful", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 p-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
