"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/axios/axiosInstance";
import DashboardLayout from "../Component/DashboardLayout";
import NewLeaderboardTable from "../Component/LeadTableCustomer";

export default function NewLeaderboardPage() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/User/order-by-money-spent"); // Replace with your actual API endpoint
      setParticipants(response.data);
    } catch (err) {
      setError("Failed to fetch participants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
          <p>Loading participants...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">New Leaderboard</h1>
        <NewLeaderboardTable participants={participants} />
      </div>
    </DashboardLayout>
  );
}
