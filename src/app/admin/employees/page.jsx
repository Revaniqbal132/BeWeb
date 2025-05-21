"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import NavbarAdmin from "@/components/NavbarAdmin";
import useAuth from "@/app/hooks/useAuth";
import ActionMenu from "@/components/ActionMenu";
import EmployeeModal from "@/components/ModalEmployee";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const allData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(allData);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setSelectedEmployeeId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employeeId) => {
    setModalMode("edit");
    setSelectedEmployeeId(employeeId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getFilteredAndSortedEmployees = () => {
    let filteredEmployees = [...employees];

    if (filterStatus !== "all") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (filterRole !== "all") {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.role.toLowerCase() === filterRole.toLowerCase()
      );
    }

    if (searchTerm) {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      filteredEmployees.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredEmployees;
  };

  const getPaginatedData = () => {
    const filteredAndSortedData = getFilteredAndSortedEmployees();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(
    getFilteredAndSortedEmployees().length / itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const StatusBadge = ({ status }) => {
    let badgeClass = "";

    switch (status?.toLowerCase()) {
      case "online":
        badgeClass = "bg-green-100 text-green-800";
        break;
      case "offline":
        badgeClass = "bg-gray-100 text-gray-800";
        break;
      case "away":
        badgeClass = "bg-yellow-100 text-yellow-800";
        break;
      default:
        badgeClass = "bg-gray-100 text-gray-800";
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
      >
        {status}
      </span>
    );
  };

  const SortIndicator = ({ column }) => {
    if (sortConfig.key !== column) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="inline w-4 h-4" />
    ) : (
      <ChevronDown className="inline w-4 h-4" />
    );
  };



  const handleDelete = async (employeeId) => {
    console.log("Deleting employee with ID:", employeeId);
    if (window.confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      try {
        await deleteDoc(doc(db, "users", employeeId));
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== employeeId)
        );
        alert("Data berhasil dihapus.");
        fetchEmployees()
      } catch (error) {
        console.error("Gagal menghapus data:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white px-12 pt-20 rounded-lg shadow-md overflow-hidden">
      <NavbarAdmin />
      <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
               onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="w-4 h-4 text-gray-500" />
            </div>
            <select
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="away">Away</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="w-4 h-4 text-gray-500" />
            </div>
            <select
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">No</div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Name <SortIndicator column="name" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("email")}
              >
                <div className="flex items-center">
                  Email <SortIndicator column="email" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("role")}
              >
                <div className="flex items-center">
                  Role <SortIndicator column="role" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Status <SortIndicator column="status" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("timeStamp")}
              >
                <div className="flex items-center">
                  Last Active <SortIndicator column="timeStamp" />
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getPaginatedData().length > 0 ? (
              getPaginatedData().map((employee, index) => (
                <tr key={employee.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {employee.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={employee.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.timeStamp?.seconds}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <ActionMenu
                        onEdit={() => openEditModal(employee.id)}
                        onDelete={() => handleDelete(employee.id)}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No employees found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium mx-1">
                {getFilteredAndSortedEmployees().length > 0
                  ? (currentPage - 1) * itemsPerPage + 1
                  : 0}
              </span>
              to
              <span className="font-medium mx-1">
                {Math.min(
                  currentPage * itemsPerPage,
                  getFilteredAndSortedEmployees().length
                )}
              </span>
              of
              <span className="font-medium mx-1">
                {getFilteredAndSortedEmployees().length}
              </span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-4 w-4" />
              </button>

              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => goToPage(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === number + 1
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  } text-sm font-medium`}
                >
                  {number + 1}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages || totalPages === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        employeeId={selectedEmployeeId}
        fetchData={fetchEmployees}
      />
    </div>
  );
}
