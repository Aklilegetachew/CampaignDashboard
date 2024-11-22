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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, Star } from "lucide-react";

type Participant = {
  id: number;
  name: string;
  employeeId: string;
  referralCode: string;
  referralCount: number;
  totalRevenue: number;
  createdAt: string;
};

type LeaderboardTableProps = {
  participants: Participant[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function LeaderboardTable({
  participants: initialParticipants,
  onEdit,
  onDelete,
}: LeaderboardTableProps) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Badge className="bg-yellow-400 text-yellow-900">
            <Star className="w-4 h-4 mr-1" /> Gold
          </Badge>
        );
      case 1:
        return (
          <Badge className="bg-gray-300 text-gray-900">
            <Star className="w-4 h-4 mr-1" /> Silver
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-amber-600 text-amber-100">
            <Star className="w-4 h-4 mr-1" /> Bronze
          </Badge>
        );
      default:
        return null;
    }
  };

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
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Referral Code</TableHead>
              <TableHead>Referral Count</TableHead>
              <TableHead>Total Revenue (ETB)</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant, index) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">
                  {index + 1}
                  {getRankBadge(index)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {getAvatar(participant.name)}
                    <span>{participant.name}</span>
                  </div>
                </TableCell>
                <TableCell>{participant.employeeId}</TableCell>
                <TableCell>
                  <a
                    href={participant.referralCode}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {participant.referralCode}
                  </a>
                </TableCell>
                <TableCell>{participant.referralCount}</TableCell>
                <TableCell>
                  {participant.totalRevenue.toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(participant.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(participant.id)}
                    className="mr-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(participant.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
