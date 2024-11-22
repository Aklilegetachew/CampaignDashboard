"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/axios/axiosInstance";
import LeaderboardTable from "../Component/LeadTable";
import DashboardLayout from "../Component/DashboardLayout";

export default function LeaderboardPage() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/Employee/order-by-revenue"); // Replace with your actual API endpoint
      const data = response.data.map((participant: any) => ({
        id: participant.id,
        name: participant.name,
        employeeId: participant.employeeId,
        referralCode: participant.referralCode,
        referralCount: participant.referralCount,
        totalRevenue: participant.totalRevenue,
        createdAt: participant.createdAt,
      }));
      setParticipants(data);
    } catch (err) {
      setError("Failed to fetch participants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing participant with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    setParticipants(participants.filter((p: any) => p.id !== id));
  };

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
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        <LeaderboardTable
          participants={participants}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}
