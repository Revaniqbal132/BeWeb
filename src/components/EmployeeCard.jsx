import React, { useState } from "react";
import {
  Calendar,
  Mail,
  CreditCard,
  Clock,
  User,
  DollarSign,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatRupiah";
import moment from "moment";

const EmployeeLeaveCard = ({ employee, handleCheckboxChange, selectedIds }) => {
  return (
    <Card className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-white/30 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-sm">Username</p>
              <h2 className="text-2xl font-bold text-white">
                {employee.username}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Full Name: {employee.fullname}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                disabled={employee.status === "Approve"}
                checked={selectedIds.includes(employee.id)}
                onChange={() => handleCheckboxChange(employee.id)}
                className="w-5 h-5 rounded border-2 border-white/50 bg-transparent checked:bg-white checked:border-white focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-500"
              />
            </label>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">
              Total Leave Days
            </p>
            <p className="text-2xl font-bold text-blue-700">
              {employee.totalCuti} days
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600 font-medium">Salary cut</p>
            <p className="text-2xl font-bold text-red-700">
              Rp {formatCurrency(employee.salary)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-700">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Bank Details</p>
              <p className="text-gray-700">{employee.bank}</p>
              {employee.accountNumber && (
                <p className="text-sm text-gray-600">
                  Account: {employee.accountNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Leave Period</p>
              <p className="text-gray-700">
                {moment(employee.startDate).format("MMM Do YYYY")} - {moment(employee.endDate).format("MMM Do YYYY")}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {employee.amount} days
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Leave Details</p>
              <p className="text-gray-700">Type: {employee.jenisCuti}</p>
              <p className="text-sm text-gray-600">Reason: {employee.reason}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                  ${
                    employee.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : employee.status === "Approve"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.status.charAt(0).toUpperCase() +
                    employee.status.slice(1)}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">WithDrawal Status</p>
                <p className="text-gray-700">{employee.withDrawalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeLeaveCard;
