"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import EmployeeCard from "@/components/EmployeeCard";
import SearchBar from "@/components/SearchBar";
import { showToast } from "@/components/Toaster";
import NavbarAdmin from "@/components/NavbarAdmin";

const Payment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [statusFilter, setStatusFilter] = useState("All"); // State untuk filter status

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const usersCollection = collection(db, "userPengajuanCuti");
      const q = query(usersCollection, orderBy("timeStamp", "desc"));
      const querySnapshot = await getDocs(q);
      const allData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Filter data berdasarkan status dan search term
  useEffect(() => {
    let filtered = data;

    // Filter berdasarkan status
    if (statusFilter !== "All") {
      filtered = filtered.filter((item) => {
        const status = item.status || "Pending"; // Default ke Pending jika status tidak ada
        return status === statusFilter;
      });
    }

    // Filter berdasarkan search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) => {
        const name = item.name || "";
        const email = item.email || "";
        const nip = item.nip || "";
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nip.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredData(filtered);
  }, [data, statusFilter, searchTerm]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((item) => item !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleApproveSelected = async () => {
    try {
      for (const id of selectedIds) {
        const docRef = doc(db, "userPengajuanCuti", id);

        await updateDoc(docRef, {
          status: "Approve",
        });
      }

      fetchAllData();
      showToast.success("Data berhasil di approve");
      setSelectedIds([]);
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };

  const handleDeclineSelected = async () => {
    try {
      for (const id of selectedIds) {
        const docRef = doc(db, "userPengajuanCuti", id);
        await updateDoc(docRef, {
          status: "Decline",
        });
      }

      setData((prevData) =>
        prevData.map((item) =>
          selectedIds.includes(item.id) ? { ...item, status: "Decline" } : item
        )
      );

      setSelectedIds([]);
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setSelectedIds([]); // Clear selected items when filter changes
  };

  return (
    <div className="bg-sky-200 min-h-screen flex flex-col">
      <NavbarAdmin />
      <div className="max-w-7xl mx-auto p-6 bg-sky-300 border rounded-md shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4 justify-center">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setData={setFilteredData}
                  data={data}
                />
              </div>
              <div>
                <button
                  className="bg-green-500 text-white mr-2 px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleApproveSelected}
                  disabled={selectedIds.length === 0}
                >
                  Approve Selected
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleDeclineSelected}
                  disabled={selectedIds.length === 0}
                >
                  Decline Selected
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="statusFilter" className="font-medium">
                Filter Status:
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="Approve">Approve</option>
                <option value="Decline">Decline</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item) => (
                <EmployeeCard
                  key={item.id}
                  selectedIds={selectedIds}
                  employee={item}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))}
            </div>
            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {statusFilter === "All"
                    ? "Tidak ada data ditemukan"
                    : `Tidak ada data dengan status "${statusFilter}"`}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
