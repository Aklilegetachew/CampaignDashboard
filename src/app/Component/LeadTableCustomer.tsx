"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

type Participant = {
  id: number;
  firstName: string;
  lastName: string;
  moneySpent: number;
  joiningDate: string;
  employee: {
    name: string;
  };
};

type NewLeaderboardTableProps = {
  participants: Participant[];
};

export default function NewLeaderboardTable({
  participants: initialParticipants,
}: NewLeaderboardTableProps) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    return (
      <div className="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-700 rounded-full">
        {initials}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search participants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Money Spent (ETB)</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Referral Person</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant, index) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">
                  {index + 1}
                  {index < 3 && (
                    <Badge
                      className={
                        index === 0
                          ? "bg-yellow-400 text-yellow-900"
                          : index === 1
                          ? "bg-gray-300 text-gray-900"
                          : "bg-amber-600 text-amber-100"
                      }
                    >
                      {index === 0 ? "Gold" : index === 1 ? "Silver" : "Bronze"}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {getAvatar(participant.firstName)}
                    <span>{participant.firstName}</span>
                  </div>
                </TableCell>
                <TableCell>{participant.lastName}</TableCell>
                <TableCell>
                  {participant.moneySpent.toLocaleString("en-US", {
                    style: "currency",
                    currency: "ETB",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(participant.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{participant.employee.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
