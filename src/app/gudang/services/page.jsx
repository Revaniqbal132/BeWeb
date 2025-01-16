"use client"; // Pastikan ini ditulis dengan benar

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavbarAdmin from "@/components/NavbarAdmin";
import {
  collection,
  getDocs,
  updateDoc as firestoreUpdateDoc,
  doc as firestoreDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
import NavbarGudang from "@/components/NavbarGudang";

const PaymentGajiBulanan = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    jangka: 0,
    bank: "BNI",
    nomorAkun: "",
    employeeId: "",
    salary: 0,
    golongan: "",
    amount: "",
    timeStamp: null,
    salaryCut: 0,
  });
  const [totalGaji, setTotalGaji] = useState(0); // State for total salary
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setIsLoading(true);
        const usersCollection = collection(db, "usersCuti");
        const querySnapshot = await getDocs(usersCollection);
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setUserList(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const fetchSelectedUser = async () => {
      try {
        if (selectedUserId) {
          setIsLoading(true);
          const docRef = firestoreDoc(db, "usersCuti", selectedUserId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userDataFromFirestore = docSnap.data();
            setFormData({
              username: userDataFromFirestore.username || "",
              fullname: userDataFromFirestore.fullname || "",
              email: userDataFromFirestore.email || "",
              jangka: userDataFromFirestore.jangka || 0,
              bank: userDataFromFirestore.bank || "BNI",
              nomorAkun: userDataFromFirestore.nomorAkun || "",
              timeStamp: userDataFromFirestore.timeStamp || null,
              employeeId: userDataFromFirestore.employeeId || "",
              salary: userDataFromFirestore.salary || 0,
              golongan: userDataFromFirestore.golongan || "",
              amount: userDataFromFirestore.amount || "",
              salaryCut: 0,
            });
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelectedUser();
  }, [selectedUserId]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleAcc = async () => {
    const {
      username,
      fullname,
      email,
      jangka,
      bank,
      nomorAkun,
      timeStamp,
      employeeId,
      salary,
      golongan,
      amount,
    } = formData;

    try {
      setIsLoading(true);

      const docRef = firestoreDoc(db, "usersCuti", email);
      await firestoreUpdateDoc(docRef, {
        username,
        fullname,
        email,
        jangka: parseInt(jangka),
        bank,
        nomorAkun,
        timeStamp,
        employeeId,
        salary,
        golongan,
        amount,
        timeStamp: new Date(),
      });

      router.push("/");
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccCuti = async () => {
    const {
      username,
      fullname,
      email,
      jangka,
      bank,
      nomorAkun,
      timeStamp,
      employeeId,
      salary,
      golongan,
      amount,
      salaryCut,
    } = formData;

    try {
      setIsLoading(true);

      const newSalary = salary - parseFloat(salaryCut);
      const totalGajiKeseluruhan = newSalary * jangka;

      const docRef = firestoreDoc(db, "usersCuti", email);
      await firestoreUpdateDoc(docRef, {
        username,
        fullname,
        email,
        jangka: parseInt(jangka),
        bank,
        nomorAkun,
        timeStamp,
        employeeId,
        salary: newSalary,
        golongan,
        amount,
        timeStamp: new Date(),
      });

      await addDoc(collection(db, "gajiBulanan"), {
        username,
        fullname,
        email,
        jangka: parseInt(jangka),
        bank,
        nomorAkun,
        timeStamp: new Date(),
        employeeId,
        salary,
        salaryCut: parseFloat(salaryCut),
        finalSalary: newSalary,
        totalGajiKeseluruhan,
        golongan,
        amount,
      });

      router.push("/");
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleCalculateTotalGaji = () => {
    const total = formData.salary * formData.jangka;
    setTotalGaji(total);
  };

  return (
    <div>
      <NavbarGudang />
      <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Payment Fee Bulanan Page</h2>

        <div className="mb-4">
          <select
            value={selectedUserId}
            onChange={(e) => handleSelectUser(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
          >
            <option value="">Select User</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} - {user.email}
              </option>
            ))}
          </select>

          <div className="mt-4">
            <p><strong>Username:</strong> {formData.username}</p>
            <p><strong>Fullname:</strong> {formData.fullname}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Duration:</strong> {formData.jangka} Bulan</p>
            <p><strong>Bank:</strong> {formData.bank}</p>
            <p><strong>Account Number:</strong> {formData.nomorAkun}</p>
            <p><strong>Tanggal Pengajuan Cuti:</strong> {formData.timeStamp ? new Date(formData.timeStamp.seconds * 1000).toLocaleDateString() : ""}</p>
            <p><strong>Employee ID:</strong> {formData.employeeId}</p>
            <p><strong>Salary:</strong> {formData.salary}</p>
            <p><strong>Golongan:</strong> {formData.golongan}</p>
            <p><strong>Amount:</strong> {formData.amount}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="salaryCut">
              Edit Salary Cut:
            </label>
            <input
              type="number"
              id="salaryCut"
              value={formData.salaryCut}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md outline-none border-none p-2"
            />
          </div>

          <button
            onClick={handleAccCuti}
            className="w-full bg-red-500 text-white p-3 rounded-md mt-6 hover:bg-red-600"
            disabled={isLoading}
          >
            ACC Cuti dan Potong Gaji
          </button>
        </div>

        <button
          onClick={handleAccCuti}
          className="w-full bg-gray-500 text-white p-3 rounded-md mt-6 hover:bg-gray-600"
          disabled={isLoading}
        >
          Take Input Data and Update Firestore
        </button>

        <button
          onClick={handleCalculateTotalGaji}
          className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600"
        >
          Total Gaji Keseluruhan
        </button>
        
        {totalGaji > 0 && (
          <p className="mt-4 text-lg font-semibold">
            Total Gaji Keseluruhan: {totalGaji}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentGajiBulanan;
