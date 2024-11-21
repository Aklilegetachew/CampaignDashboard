"use client";

import { useState } from "react";
import LeaderboardTable from "../Component/LeadTable";
import DashboardLayout from "../Component/DashboardLayout";

const initialParticipants = [
  {
    id: 1,
    name: "Alice Johnson",
    score: 9800,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    score: 9600,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Charlie Brown",
    score: 9400,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Lee",
    score: 9200,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Eva Martinez",
    score: 9000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function LeaderboardPage() {
  const [participants, setParticipants] = useState(initialParticipants);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing participant with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

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
