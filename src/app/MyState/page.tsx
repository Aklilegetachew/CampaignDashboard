"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  LinkIcon,
  Calendar,
  BadgeIcon as IdCard,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardLayout from "../Component/DashboardLayout";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Employee = {
  createdAt: string;
  employeCode: string;
  employeeId: string;
  id: number;
  name: string;
  password: string;
  referralCode: string;
  referralCount: 1;
  roleType: string;
  totalRevenue: 81326.09;
  updatedAt: string;
  username: string;
};

type Transaction = {
  id: number;
  employeeId: number;
  amount: number;
  date: string;
};

type User = {
  id: number;
  employeeId: number;
  username: string;
  email: string;
};

export default function EmployeeProfile() {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [employee, setEmployee] = useState<any | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [signups, setSignups] = useState<any[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      setId(decoded.EmployeeId);
    } else {
      router.push("/");
    }
  }, [token, router]);

  const employeeId = id;

  useEffect(() => {
    if (!employeeId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [employeeResponse, transactionResponse, newSubs] =
          await Promise.all([
            axiosInstance.get(`/Employee/${employeeId}`),
            axiosInstance.get(`/Transaction/employee/${employeeId}`),
            axiosInstance.get(`/User/by-employee/${employeeId}`),
          ]);

        setEmployee(employeeResponse.data);
        setTransactions(transactionResponse.data);
        setSignups(newSubs.data);
        console.log(newSubs.data);
        console.log(employeeResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 bg-background">
        {/* Left Sidebar */}
        <Card className="w-full lg:w-80 shrink-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{employee.name}</h2>
              <p className="text-sm text-muted-foreground">
                {employee.referralCode}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">About</h3>
                <div className="space-y-3">
                  {/* Updated icons */}
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.username}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <IdCard className="w-4 h-4 text-muted-foreground" />
                    <span className="break-all">{employee.employeeId}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Link</h3>
                <div className="space-y-3">
                  {/* Updated icons */}
                  <div className="flex items-center gap-2 text-sm">
                    <LinkIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>{employee.employeCode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>
                      {" "}
                      {new Date(employee.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">State</h3>
                <div className="space-y-3">
                  {/* Updated icons */}
                  <div className="flex items-center gap-2 text-sm">
                    <LinkIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>{employee.referralCount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>{employee.totalRevenue}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Job Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenu information</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                + Add Info
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea
                className="w-full"
                style={{ height: "calc(5 * 3rem)" }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Customer Name</TableHead>
                      <TableHead className="w-[150px]">Last Name</TableHead>
                      <TableHead className="w-[150px]">
                        Total Transaction
                      </TableHead>
                      <TableHead className="w-[150px]">Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell>{customer.user.firstName}</TableCell>
                        <TableCell>{customer.user.lastName}</TableCell>
                        <TableCell>{customer.totalTransaction}</TableCell>
                        <TableCell>
                          {" "}
                          {new Date(customer.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>New Subscribers</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {signups.map((users, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {users.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {users.firstName} {users.lastName}
                        </span>{" "}
                        <span className="text-muted-foreground">
                          joined on{" "}
                          {new Date(users.joiningDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compensation */}
        </div>
      </div>
    </DashboardLayout>
  );
}
