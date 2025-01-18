// "use client"; // Pastikan ini ditulis dengan benar

// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const GajiKeseluruhan = () => {
//   const [gajiList, setGajiList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchGajiList = async () => {
//       try {
//         setIsLoading(true);
//         const gajiCollection = collection(db, "gajiKeseluruhan");
//         const querySnapshot = await getDocs(gajiCollection);
//         const gajiData = [];
//         querySnapshot.forEach((doc) => {
//           gajiData.push({ id: doc.id, ...doc.data() });
//         });
//         setGajiList(gajiData);
//       } catch (error) {
//         console.error("Error fetching gaji data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchGajiList();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Data Karyawan</h2>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="min-w-full divide-y  divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-2 py-3 bg-gray-50">Username</th>
//                 <th className="px-2 py-3 bg-gray-50">Fullname</th>
//                 <th className="px-2 py-3 bg-gray-50">Email</th>
//                 <th className="px-2 py-3 bg-gray-50">Duration</th>
//                 <th className="px-2 py-3 bg-gray-50">Bank</th>
//                 <th className="px-2 py-3 bg-gray-50">Account Number</th>
//                 <th className="px-2 py-3 bg-gray-50">Salary</th>
//                 <th className="px-2 py-3 bg-gray-50">Salary Cut</th>
//                 <th className="px-2 py-3 bg-gray-50">Final Salary</th>
//                 <th className="px-2 py-3 bg-gray-50">Total Gaji Keseluruhan</th>
//                 <th className="px-2 py-3 bg-gray-50">Golongan</th>
//                 <th className="px-2 py-3 bg-gray-50">Acc</th>
//                 <th className="px-2 py-3 bg-gray-50">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {gajiList.map((gaji) => (
//                 <tr key={gaji.id}>
//                   <td className="px-2 py-4">{gaji.username}</td>
//                   <td className="px-2 py-4">{gaji.fullname}</td>
//                   <td className="px-2 py-4">{gaji.email}</td>
//                   <td className="px-2 py-4">{gaji.jangka} Bulan</td>
//                   <td className="px-2 py-4">{gaji.bank}</td>
//                   <td className="px-2 py-4">{gaji.nomorAkun}</td>
//                   <td className="px-2 py-4">{gaji.salary}</td>
//                   <td className="px-2 py-4">{gaji.salaryCut}</td>
//                   <td className="px-2 py-4">{gaji.finalSalary}</td>
//                   <td className="px-2 py-4">{gaji.totalGajiKeseluruhan}</td>
//                   <td className="px-2 py-4">{gaji.golongan}</td>
//                   <td className="px-2 py-4">{gaji.diterimaAcc}</td>
//                   <td className="px-2 py-4">{gaji.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GajiKeseluruhan;

//tgl 14 oktober 2024
// "use client"; // Pastikan ini ditulis dengan benar

// import React, { useState, useEffect } from "react";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import { getAuth } from "firebase/auth";
// import Navbar from "@/components/Navbar";

// const Payment = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setIsLoading(true);

//         // Ambil email pengguna yang sedang login dari Firebase Authentication
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user) {
//           const userEmail = user.email;  // Ambil email pengguna yang sedang login

//           // Ambil koleksi userPengajuanCuti dari Firestore
//           const usersCollection = collection(db, "userPengajuanCuti");

//           // Query untuk memfilter berdasarkan email pengguna dan mengurutkan berdasarkan timeStamp secara descending
//           const q = query(
//             usersCollection,
//             where("email", "==", userEmail),  // Filter berdasarkan email pengguna yang sedang login
//             orderBy("timeStamp", "desc")      // Urutkan berdasarkan timeStamp
//           );

//           // Eksekusi query dan ambil hasilnya
//           const querySnapshot = await getDocs(q);

//           // Map hasil query menjadi array data
//           const filteredData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//           // Set data hasil query ke state
//           setData(filteredData);
//         } else {
//           console.log("Pengguna belum login");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       <div className="max-w-9xl mx-auto p-6 bg-sky-300 border- md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Username</th>
//                 <th className="py-2 px-4 border-b">Fullname</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">Bank</th>
//                 <th className="py-2 px-4 border-b">Total Cuti</th>
//                 <th className="py-2 px-4 border-b">Account Number</th>
//                 <th className="py-2 px-4 border-b">Tanggal Hari ini</th>
//                 <th className="py-2 px-4 border-b">Tanggal Pengajuan Cuti</th>
//                 <th className="py-2 px-4 border-b">Tanggal Akhir Cuti</th>
//                 <th className="py-2 px-4 border-b">Amount</th>
//                 <th className="py-2 px-4 border-b">Salary Cut</th>
//                 <th className="py-2 px-4 border-b">Reason</th>
//                 <th className="py-2 px-4 border-b">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="py-2 px-4 border-b">{item.username}</td>
//                   <td className="py-2 px-4 border-b">{item.fullname}</td>
//                   <td className="py-2 px-4 border-b">{item.email}</td>
//                   <td className="py-2 px-4 border-b">{item.bank}</td>
//                   <td className="py-2 px-4 border-b">{item.totalCuti}</td>
//                   <td className="py-2 px-4 border-b">{item.accountNumber}</td>
//                   <td className="py-2 px-4 border-b">{item.timeStamp ? new Date(item.timeStamp.seconds * 1000).toLocaleDateString() : ""}</td>
//                   <td className="py-2 px-4 border-b">{item.startDate}</td>
//                   <td className="py-2 px-4 border-b">{item.endDate}</td>
//                   <td className="py-2 px-4 border-b">{item.amount}</td>
//                   <td className="py-2 px-4 border-b">{item.salary}</td>
//                   <td className="py-2 px-4 border-b">{item.reason}</td>
//                   <td className="py-2 px-4 border-b">{item.diterimaAcc || "Pending"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;

"use client"; // Make sure this is written correctly

import NavbarAdmin from "@/components/NavbarAdmin";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const Payment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Get the logged-in user's email from Firebase Authentication
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email;

        // Fetch the userPengajuanCuti collection from Firestore
        const usersCollection = collection(db, "userPengajuanCuti");

        // Query to filter by the logged-in user's email and order by timeStamp descending
        // const q = query(
        //   usersCollection,
        //   where("email", "==", userEmail),
        //   orderBy("timeStamp", "desc")
        // );

        // const q = query(
        //   usersCollection,
        //   where("email", "==", userEmail),
        //   orderBy("timeStamp", "desc")
        // );

        const q = query(
          usersCollection,
          orderBy("timeStamp", "desc"),
          where("email", "==", userEmail)
        );

        // Execute query and get the result
        const querySnapshot = await getDocs(q);

        // Map the query result to an array
        const filteredData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the data to the state
        setData(filteredData);
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // Collapse row if it's already expanded
    } else {
      setExpandedRow(index); // Expand clicked row
    }
  };

  console.log(data);
  return (
    <div className="bg-sky-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-9xl mx-auto p-6 bg-sky-300 border rounded-md shadow-md mt-36">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Payment Page
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 border rounded-md shadow-sm hover:shadow-lg cursor-pointer"
                onClick={() => toggleRow(index)} // Toggle row on click
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-gray-700 mb-11">
                    {item.username}
                  </span>
                  <span className="text-sm mt-12 items-center text-gray-500">
                    {item.email}
                  </span>
                </div>

                {/* Display additional info when row is expanded */}
                {expandedRow === index && (
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p><strong>Fullname:</strong> {item.fullname}</p>
                    <p><strong>Bank:</strong> {item.bank}</p>
                    <p><strong>Total Cuti:</strong> {item.totalCuti}</p>
                    <p><strong>Account Number:</strong> {item.accountNumber}</p>
                    <p><strong>Tanggal Hari Ini:</strong> {item.timeStamp ? new Date(item.timeStamp.seconds * 1000).toLocaleDateString() : ""}</p>
                    <p><strong>Tanggal Pengajuan Cuti:</strong> {item.startDate ? new Date(item.startDate.seconds * 1000).toLocaleDateString() : ""}</p>
                    <p><strong>Tanggal Akhir Cuti:</strong>  {item.endDate ? new Date(item.endDate.seconds * 1000).toLocaleDateString() : ""}</p>
                    <p><strong>Amount:</strong> {item.amount}</p>
                    <p><strong>Salary Cut:</strong> {item.salary}</p>
                    <p><strong>Reason:</strong> {item.reason}</p>
                    {/* <p><strong>Status:</strong> {item.diterimaAcc || "Pending"}</p> */}
                    <p><strong>Status:</strong> {item.status || "Pending"}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;

// "use client";

// import React, { useState, useEffect } from "react";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import Navbar from "@/components/Navbar";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const Payment = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     const auth = getAuth();

//     // Cek apakah user sudah login
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserEmail(user.email); // Ambil email user
//         fetchUserData(user.email); // Fetch data berdasarkan email user
//       } else {
//         console.log("User belum login.");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchUserData = async (email) => {
//     try {
//       setIsLoading(true);

//       // Query data berdasarkan email user yang login
//       const usersCollection = collection(db, "userPengajuanCuti");
//       const q = query(
//         usersCollection,
//         where("email", "==", email),      // Filter berdasarkan email user login
//         orderBy("timeStamp", "desc")     // Urutkan berdasarkan waktu
//       );

//       const querySnapshot = await getDocs(q);

//       // Mapping data ke state
//       const fetchedData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setData(fetchedData);
//     } catch (error) {
//       console.error("Error fetching data:", error.code, error.message, error.stack);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleRow = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       <div className="max-w-9xl mx-auto p-6 bg-sky-300 border rounded-md shadow-md mt-36">
//         <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Payment Page</h2>
//         {isLoading ? (
//           <div className="flex justify-center items-center">
//             <p className="text-xl text-gray-600">Loading...</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {data.length === 0 ? (
//               <p className="text-center text-gray-600">Data tidak ditemukan.</p>
//             ) : (
//               data.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 border rounded-md shadow-sm hover:shadow-lg cursor-pointer"
//                   onClick={() => toggleRow(index)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-lg text-gray-700 mb-11">{item.username}</span>
//                     <span className="text-sm mt-12 items-center text-gray-500">{item.email}</span>
//                   </div>

//                   {expandedRow === index && (
//                     <div className="mt-4 space-y-2 text-sm text-gray-600">
//                       <p><strong>Fullname:</strong> {item.fullname}</p>
//                       <p><strong>Bank:</strong> {item.bank}</p>
//                       <p><strong>Total Cuti:</strong> {item.totalCuti}</p>
//                       <p><strong>Account Number:</strong> {item.accountNumber}</p>
//                       <p><strong>Tanggal Hari Ini:</strong> {item.timeStamp ? new Date(item.timeStamp.seconds * 1000).toLocaleDateString() : ""}</p>
//                       <p><strong>Tanggal Pengajuan Cuti:</strong> {item.startDate}</p>
//                       <p><strong>Tanggal Akhir Cuti:</strong> {item.endDate}</p>
//                       <p><strong>Amount:</strong> {item.amount}</p>
//                       <p><strong>Salary Cut:</strong> {item.salary}</p>
//                       <p><strong>Reason:</strong> {item.reason}</p>
//                       <p><strong>Status:</strong> {item.status || "Pending"}</p>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;
