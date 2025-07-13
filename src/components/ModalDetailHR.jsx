import {
  Cake,
  Calendar,
  Clock,
  Mail,
  Shield,
  User,
  X,
  UserRoundPen,
} from "lucide-react";
import React from "react";

export const EmployeeDetailModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  const formatDate = (timestamp) => {
    if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString("id-ID");
    }
    return "N/A";
  };

  const formatJoinDate = (dateString) => {
    if (dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "N/A";
  };

  const getRoleColor = (role) => {
    const colors = {
      manager: "bg-blue-100 text-blue-800",
      developer: "bg-green-100 text-green-800",
      analyst: "bg-purple-100 text-purple-800",
      admin: "bg-red-100 text-red-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };
  console.log(employee);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Employee Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <p className="text-sm text-gray-900">{employee.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">{employee.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColor(
                      employee.role
                    )}`}
                  >
                    {employee.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <p className="text-sm text-gray-900">
                  {employee.id_karyawan || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <p className="text-sm text-gray-900">
                  {employee.department || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                    employee.status
                  )}`}
                >
                  {employee.status || "Active"}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Cake className="w-5 h-5 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <p className="text-sm text-gray-900">
                  {employee.usia} years old
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <UserRoundPen className="w-5 h-5 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <p className="text-sm text-gray-900">
                  {employee.gender} 
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {/* <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <p className="text-sm text-gray-900">
                  {employee.phone || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <p className="text-sm text-gray-900">
                  {employee.address || "N/A"}
                </p>
              </div>
            </div>
          </div> */}

          {/* Timeline Info */}
          {/* <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              Timeline
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Join Date
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatJoinDate(employee.joinDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDate(employee.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
