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
  Phone,
  Mail,
  MapPin,
  Building2,
  Map,
  Calendar,
  BadgeIcon as IdCard,
  Briefcase,
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
  const [employee, setEmployee] = useState<any | null>();
  const [transactions, setTransactions] = useState<any | null>();
  const [user, setUser] = useState<User | null>(null);
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
      console.log("id", employeeId);
      try {
        const [employeeResponse, transactionResponse] = await Promise.all([
          axiosInstance.get(`/Employee/${id}`),
          axiosInstance.get(`/Transaction/employee/${id}`),
        ]);

        setEmployee(employeeResponse.data);
        setTransactions(transactionResponse.data);
        console.log("Employee", employee);
        console.log("transact", transactions);
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
                <AvatarFallback>NS</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">Nicholas Swatz</h2>
              <p className="text-sm text-muted-foreground">#ERD246534</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">About</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>(629) 555-0123</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="break-all">nicholasswatz@gmail.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Address</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>390 Market Street, Suite 200</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>San Francisco CA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Map className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>94102</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Employee details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>Sep 26, 1988</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <IdCard className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>GER10654</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>Project Manager</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 shrink-0 text-muted-foreground" />
                    <span>Jan 05, 2023</span>
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
              <CardTitle>Job information</CardTitle>
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
                      <TableHead className="w-[150px]">DEPARTMENT</TableHead>
                      <TableHead className="w-[150px]">DIVISION</TableHead>
                      <TableHead className="w-[150px]">MANAGER</TableHead>
                      <TableHead className="w-[150px]">HIRE DATE</TableHead>
                      <TableHead className="w-[150px]">LOCATION</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Creative Associate</TableCell>
                      <TableCell>Project Management</TableCell>
                      <TableCell>Alex Foster</TableCell>
                      <TableCell>May 13, 2024</TableCell>
                      <TableCell>Metro DC</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Marketing Team</TableCell>
                      <TableCell>Leadership</TableCell>
                      <TableCell>Jack Danniel</TableCell>
                      <TableCell>Sep 05, 2024</TableCell>
                      <TableCell>Bergen, NJ</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Team Lead</TableCell>
                      <TableCell>Creator</TableCell>
                      <TableCell>Alina Skazka</TableCell>
                      <TableCell>Jun 08, 2023</TableCell>
                      <TableCell>Miami, FL</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Finance & Accounting</TableCell>
                      <TableCell>Senior Consultant</TableCell>
                      <TableCell>John Miller</TableCell>
                      <TableCell>Sep 13, 2022</TableCell>
                      <TableCell>Chicago, IL</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Team Lead</TableCell>
                      <TableCell>Creator</TableCell>
                      <TableCell>Mark Baldwin</TableCell>
                      <TableCell>Jul 07, 2023</TableCell>
                      <TableCell>Miami, FL</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity</CardTitle>
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
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">John Miller</span>{" "}
                      <span className="text-muted-foreground">
                        last login on Jul 13, 2024
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">05:36 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Merva Sahin</span>{" "}
                      <span className="text-muted-foreground">
                        date created on Sep 08, 2024
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">03:12 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Tammy Collier</span>{" "}
                      <span className="text-muted-foreground">
                        updated on Aug 15, 2023
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">05:36 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Compensation</CardTitle>
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
                <div className="space-y-1">
                  <p className="text-sm font-medium">862.00 USD per month</p>
                  <p className="text-xs text-muted-foreground">
                    Effective date on May 10, 2015
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">1560.00 USD per quater</p>
                  <p className="text-xs text-muted-foreground">
                    Effective date on Jun 08, 2022
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">378.00 USD per week</p>
                  <p className="text-xs text-muted-foreground">
                    Effective date on Jun 08, 2022
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
