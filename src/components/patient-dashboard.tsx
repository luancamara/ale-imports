"use client"

import { Calendar, CreditCard, MoreHorizontal, Users } from "lucide-react"
import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

type Patient = {
  id: string
  full_name: string
  date_of_birth: string
  email: string
  phone: string
  payment_method: string
  gender: Gender
}

const patients: Patient[] = [
  {
    id: "1",
    full_name: "Alice Johnson",
    date_of_birth: "1990-05-15",
    email: "alice@example.com",
    phone: "+1234567890",
    payment_method: "Per Session",
    gender: Gender.Female,
  },
  {
    id: "2",
    full_name: "Bob Smith",
    date_of_birth: "1985-11-22",
    email: "bob@example.com",
    phone: "+1987654321",
    payment_method: "Health Plan",
    gender: Gender.Male,
  },
  {
    id: "3",
    full_name: "Carol Williams",
    date_of_birth: "1992-03-08",
    email: "carol@example.com",
    phone: "+1122334455",
    payment_method: "Fixed Monthly Amount",
    gender: Gender.Female,
  },
  {
    id: "4",
    full_name: "David Brown",
    date_of_birth: "1988-09-30",
    email: "david@example.com",
    phone: "+1555666777",
    payment_method: "Monthly by Sessions",
    gender: Gender.Male,
  },
  {
    id: "5",
    full_name: "Eva Davis",
    date_of_birth: "1995-07-12",
    email: "eva@example.com",
    phone: "+1999888777",
    payment_method: "Per Session",
    gender: Gender.Female,
  },
] as const

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function PatientDashboardComponent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients =
    searchTerm.trim() === ""
      ? patients
      : patients.filter((patient) => patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden w-64 bg-white p-4 shadow-md lg:block">
        <h2 className="mb-4 text-2xl font-bold">Psychology Clinic</h2>
        <nav>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center">
              <Users className="mr-2 size-4" />
              Patients
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center">
              <Calendar className="mr-2 size-4" />
              Appointments
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center">
              <CreditCard className="mr-2 size-4" />
              Billing
            </a>
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-6 text-3xl font-bold">Patient Dashboard</h1>

        {/* Search input */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search patients..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Insights */}
        <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients ? patients.length : 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gender Distribution</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2">
              <ChartContainer className="h-[200px]" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.values(Gender).map((gender) => ({
                        name: gender,
                        value: patients.filter((p) => p.gender === gender).length,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {Object.values(Gender).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-2 flex justify-center space-x-4">
                {Object.values(Gender).map((gender, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div
                      className="mr-2 size-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{gender}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
              <CreditCard className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Per Session: {(patients || []).filter((p) => p.payment_method === "Per Session").length}</li>
                <li>
                  Fixed Monthly: {(patients || []).filter((p) => p.payment_method === "Fixed Monthly Amount").length}
                </li>
                <li>
                  Monthly by Sessions:{" "}
                  {(patients || []).filter((p) => p.payment_method === "Monthly by Sessions").length}
                </li>
                <li>Health Plan: {(patients || []).filter((p) => p.payment_method === "Health Plan").length}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Patient table */}
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>A list of all patients in the clinic.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.full_name}</TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.payment_method}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit patient</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete patient</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
