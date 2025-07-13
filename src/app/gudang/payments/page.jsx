"use client"; // Pastikan ini ditulis dengan benar

import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Navbar from "@/components/Navbar";
import NavbarGudang from "@/components/NavbarGudang";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";
import LeaveRequestModal from "@/components/ModalDetail";
import { showToast } from "@/components/Toaster";

const Payment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [statusFilter, setStatusFilter] = useState("pending");

  const fetchAllData = async () => {
    try {
      setIsLoading(true);

      // Fetch all user documents from Firestore
      const usersCollection = collection(db, "userPengajuanCuti");
      let q;

      if (statusFilter && statusFilter !== "All") {
        q = query(
          usersCollection,
          where("status", "==", statusFilter),
          orderBy("timeStamp", "desc")
        );
      } else {
        q = query(usersCollection, orderBy("timeStamp", "desc"));
      }

      const querySnapshot = await getDocs(q);

      const allData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(allData);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [statusFilter]);

  const handleRowClick = (row) => {
    setSelectedData(row);
    setIsOpen(true);
  };

  const handleApproveSelected = async (data, salary) => {
    setLoadingUpdate(true);
    try {
      const docRef = doc(db, "userPengajuanCuti", data.id);

      await updateDoc(docRef, {
        // diterimaAcc: "Approve",
        salary: salary,
      });
      setLoadingUpdate(false);
      showToast.success(`Salary ${data.fullname} berhasil di update`);
      fetchAllData();
      setIsOpen(false);
    } catch (error) {
      setLoadingUpdate(false);
      showToast.error("Salary gagal di update");
      console.error("Error updating documents:", error);
    }
  };

  return (
    <div>
      <NavbarGudang />
      <div className="max-w-6xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            data={data}
            title="Daftar Pengajuan Cuti"
            itemsPerPage={10}
            searchPlaceholder="Cari karyawan..."
            searchFields={["fullname", "email", "reason"]}
            onRowClick={handleRowClick}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            loading={isLoading}
          />
        )}
      </div>
      <LeaveRequestModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedData}
        onSubmit={handleApproveSelected}
        loading={loadingUpdate}
      />
    </div>
  );
};

export default Payment;
