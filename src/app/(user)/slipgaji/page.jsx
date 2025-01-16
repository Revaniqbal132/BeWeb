// "use client";
// import React, { useEffect, useState } from "react";
// import { formatRupiah } from "@/utils/formatRupiah";
// import Navbar from "@/components/Navbar";
// import {
//   collection,
//   doc,
//   onSnapshot,
//   query,
//   where,
//   setDoc,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";

// const Slipgaji = () => {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // initial state true to show loading
//   const [warning, setWarning] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [amount, setAmount] = useState(0); // Amount for transaction

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userProfile = JSON.parse(localStorage.getItem("userMSavingProfile"));
//         if (userProfile) {
//           setUserData(userProfile);
//           setIsLoading(false);
//         } else {
//           setIsLoading(false); // handle case where user profile is not found
//         }
        
//         const q = query(collection(db, "users"), where("id", "==", userProfile?.uid));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//           const userData = snapshot.docs.map((doc) => doc.data())[0];
//           setUserData(userData);
//           localStorage.setItem("userMSavingProfile", JSON.stringify(userData));
//           if (!userData.lastPaymentDate) {
//             setWarning("Cuti anda belum di acc");
//           } else if (userData.withDrawalStatus === "pending") {
//             setWarning("Tunggu konfirmasi pembayaran maksimal 1 x 24 Jam");
//           } else {
//             setWarning("");
//           }
//         });
//         return () => unsubscribe();
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       setIsLoading(false); // set isLoading to false once user data is fetched
//     }
//   }, [userData]);

//   useEffect(() => {
//     const handlePostTransactionActions = async () => {
//       try {
//         // Example: Save transaction log to Firestore
//         const transactionLogRef = doc(db, 'transaction_logs', `log-${userData.uid}-${Date.now()}`);
//         await setDoc(transactionLogRef, {
//           userId: userData.uid,
//           transactionType: 'Pemotongan Cuti',
//           amount: amount,
//           timestamp: new Date(),
//         });

//         // Example: Send notification to user
//         const notificationRef = doc(db, 'notifications', `notification-${userData.uid}-${Date.now()}`);
//         await setDoc(notificationRef, {
//           userId: userData.uid,
//           message: 'Pemotongan cuti berhasil dilakukan.',
//           timestamp: new Date(),
//           status: 'unread',
//         });

//         // Example: Update local state or perform other UI actions
//         // setState(newValue);
//       } catch (error) {
//         console.error('Error performing post transaction actions:', error);
//       }
//     };

//     if (successMessage) {
//       handlePostTransactionActions();
//     }
//   }, [successMessage, userData, amount]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Slip Gaji</h2>
//         <div className="mb-4">
//           <p>
//             <strong>Fullname:</strong> {userData.fullname}
//           </p>
//           <p>
//             <strong>Email:</strong> {userData.email}
//           </p>
//           <p>
//             <strong>Username:</strong> {userData.username}
//           </p>
//           <p>
//             <strong>Bank:</strong> {userData.bank}
//           </p>
//           <p>
//             <strong>Account Number:</strong> {userData.nomorAkun}
//           </p>
//           <p>
//             <strong>Employee ID:</strong> {userData.employeeId}
//           </p>
//           <p>
//             <strong>Salary:</strong> {formatRupiah(userData.salary)}
//           </p>
//           <p>
//             <strong>Golongan:</strong> {userData.golongan}
//           </p>
//           <p>
//             <strong>Duration:</strong> {userData.jangka} Bulan
//           </p>
//         </div>
//         {warning && (
//           <div className="p-4 bg-red-100 rounded-2xl text-xl font-semibold mb-8">
//             <p>{warning}</p>
//           </div>
//         )}
//         {successMessage && (
//           <div className="p-4 bg-green-100 rounded-2xl text-xl font-semibold mb-8">
//             <p>{successMessage}</p>
//           </div>
//         )}
//         <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 md:p-10 rounded-2xl text-white flex justify-between items-center">
//           <p className="text-3xl md:text-6xl">
//             Saldo: {formatRupiah(userData.salary)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slipgaji;


// "use client"; // Pastikan ini ditulis dengan benar

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import {
//   collection,
//   getDocs,
//   doc as firestoreDoc,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";

// const Payslip = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     duration: "",
//     bank: "BNI",
//     accountNumber: "",
//     employeeId: "",
//     salary: 0,
//     golongan: "",
//     amount: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setIsLoading(true);

//         // Ambil data pengguna dari Firestore berdasarkan email (diasumsikan unik)
//         const querySnapshot = await getDocs(collection(db, "usersCuti"));
//         const userData = querySnapshot.docs.find(
//           (doc) => doc.data().email === "email_pengguna@contoh.com"
//         ); // Ganti dengan email pengguna yang login atau sedang aktif

//         if (userData) {
//           setFormData({
//             username: userData.data().username || "",
//             fullname: userData.data().fullname || "",
//             email: userData.data().email || "",
//             duration: userData.data().duration || "",
//             bank: userData.data().bank || "BNI",
//             accountNumber: userData.data().accountNumber || "",
//             employeeId: userData.data().employeeId || "",
//             salary: userData.data().salary || 0,
//             golongan: userData.data().golongan || "",
//             amount: userData.data().amount || "",
//           });
//         } else {
//           console.log("User data not found!");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         // Handle error
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleGeneratePayslip = async () => {
//     const {
//       username,
//       fullname,
//       email,
//       duration,
//       bank,
//       accountNumber,
//       employeeId,
//       salary,
//       golongan,
//       amount,
//     } = formData;

//     try {
//       setIsLoading(true);

//       // Contoh: Mengupdate atau menyimpan slip gaji ke dalam Firestore
//       const docRef = firestoreDoc(db, "slipGaji", email); // Menyimpan slip gaji ke koleksi slipGaji dengan dokumen berdasarkan email
//       await setDoc(docRef, {
//         username,
//         fullname,
//         email,
//         duration: parseInt(duration),
//         bank,
//         accountNumber,
//         employeeId,
//         salary,
//         golongan,
//         amount,
//         timeStamp: new Date(), // Contoh: Timestamp
//       });

//       router.push("/"); // Redirect setelah slip gaji berhasil dibuat
//     } catch (error) {
//       console.error("Error generating payslip:", error);
//       // Handle error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <NavbarAdmin />
//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Payslip Page</h2>

//         <div className="mt-4">
//           <p><strong>Username:</strong> {formData.username}</p>
//           <p><strong>Fullname:</strong> {formData.fullname}</p>
//           <p><strong>Email:</strong> {formData.email}</p>
//           <p><strong>Duration:</strong> {formData.duration} Bulan</p>
//           <p><strong>Bank:</strong> {formData.bank}</p>
//           <p><strong>Account Number:</strong> {formData.accountNumber}</p>
//           <p><strong>Employee ID:</strong> {formData.employeeId}</p>
//           <p><strong>Salary:</strong> {formData.salary}</p>
//           <p><strong>Golongan:</strong> {formData.golongan}</p>
//           <p><strong>Amount:</strong> {formData.amount}</p>
//         </div>

//         <button
//           onClick={handleGeneratePayslip}
//           className="w-full bg-gray-500 text-white p-3 rounded-md mt-6 hover:bg-gray-600"
//           disabled={isLoading}
//         >
//           Generate Payslip
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payslip;


// "use client"
// import React, { useEffect, useState } from "react";
// import { formatRupiah } from "@/utils/formatRupiah";
// import Navbar from "@/components/Navbar";
// import {
//   collection,
//   onSnapshot,
//   query,
//   where,
//   doc as firestoreDoc, // Aliasan untuk fungsi doc
//   setDoc as firestoreSetDoc, // Aliasan untuk fungsi setDoc
//   updateDoc as firestoreUpdateDoc, // Aliasan untuk fungsi updateDoc
//   getDoc, // Impor getDoc
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";

// const Slipgaji = () => {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [warning, setWarning] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [amount, setAmount] = useState(0);

//   // Definisikan fungsi fetchUserProfile di luar useEffect
//   const fetchUserProfile = async () => {
//     try {
//       const userProfile = JSON.parse(localStorage.getItem("userMSavingProfile"));
//       if (userProfile) {
//         setUserData(userProfile);
//         setIsLoading(false);
//       } else {
//         setIsLoading(false);
//       }

//       const q = query(collection(db, "users"), where("id", "==", userProfile?.uid));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const userData = snapshot.docs.map((doc) => doc.data())[0];
//         setUserData(userData);
//         localStorage.setItem("userMSavingProfile", JSON.stringify(userData));
//         if (!userData.lastPaymentDate) {
//           setWarning("Cuti anda belum di acc");
//         } else if (userData.withDrawalStatus === "pending") {
//           setWarning("Tunggu konfirmasi pembayaran maksimal 1 x 24 Jam");
//         } else {
//           setWarning("");
//         }
//       });

//       const usersCutiQ = query(collection(db, "usersCuti"), where("id", "==", userProfile?.uid));
//       const usersCutiUnsubscribe = onSnapshot(usersCutiQ, (snapshot) => {
//         const updatedUserData = snapshot.docs.map((doc) => doc.data())[0];
//         setUserData(updatedUserData);
//         localStorage.setItem("userMSavingProfile", JSON.stringify(updatedUserData));
//       });

//       return () => {
//         unsubscribe();
//         usersCutiUnsubscribe();
//       };
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile(); // Panggil fetchUserProfile di dalam useEffect
//   }, []); // [] artinya hanya dipanggil sekali saat komponen di-mount

//   useEffect(() => {
//     if (userData) {
//       setIsLoading(false);
//     }
//   }, [userData]);

//   useEffect(() => {
//     const handlePostTransactionActions = async () => {
//       try {
//         const transactionLogRef = firestoreDoc(db, 'transaction_logs', `log-${userData.uid}-${Date.now()}`);
//         await firestoreSetDoc(transactionLogRef, {
//           userId: userData.uid,
//           transactionType: 'Pemotongan Cuti',
//           amount: amount,
//           timestamp: new Date(),
//         });

//         const notificationRef = firestoreDoc(db, 'notifications', `notification-${userData.uid}-${Date.now()}`);
//         await firestoreSetDoc(notificationRef, {
//           userId: userData.uid,
//           message: 'Pemotongan cuti berhasil dilakukan.',
//           timestamp: new Date(),
//           status: 'unread',
//         });
//       } catch (error) {
//         console.error('Error performing post transaction actions:', error);
//       }
//     };

//     if (successMessage) {
//       handlePostTransactionActions();
//     }
//   }, [successMessage, userData, amount]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-lg"></span>
//       </div>
//     );
//   }

//   const handleManualRefresh = () => {
//     fetchUserProfile();
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Slip Gaji</h2>
//         <div className="mb-4">
//           <p>
//             <strong>Fullname:</strong> {userData.fullname}
//           </p>
//           <p>
//             <strong>Email:</strong> {userData.email}
//           </p>
//           <p>
//             <strong>Username:</strong> {userData.username}
//           </p>
//           <p>
//             <strong>Bank:</strong> {userData.bank}
//           </p>
//           <p>
//             <strong>Account Number:</strong> {userData.nomorAkun}
//           </p>
//           <p>
//             <strong>Employee ID:</strong> {userData.employeeId}
//           </p>
//           <p>
//             <strong>Salary:</strong> {formatRupiah(userData.salary)}
//           </p>
//           <p>
//             <strong>Golongan:</strong> {userData.golongan}
//           </p>
//           <p>
//             <strong>Duration:</strong> {userData.jangka} Bulan
//           </p>
//         </div>
//         {warning && (
//           <div className="p-4 bg-red-100 rounded-2xl text-xl font-semibold mb-8">
//             <p>{warning}</p>
//           </div>
//         )}
//         {successMessage && (
//           <div className="p-4 bg-green-100 rounded-2xl text-xl font-semibold mb-8">
//             <p>{successMessage}</p>
//           </div>
//         )}
//         <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 md:p-10 rounded-2xl text-white flex justify-between items-center">
//           <p className="text-3xl md:text-6xl">
//             Saldo: {formatRupiah(userData.salary)}
//           </p>
//         </div>
//         <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleManualRefresh}>
//           Refresh Data
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Slipgaji;


"use client"; // Pastikan ini ditulis dengan benar

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore"; // Pastikan semua fungsi yang diperlukan diimpor

import { db } from "@/firebase/firebase";

const Slipgaji = () => {
  const [slipGajiList, setSlipGajiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSlipGajiList = async () => {
      try {
        setIsLoading(true);
        const slipGajiCollection = collection(db, "slipGaji");
        const querySnapshot = await getDocs(slipGajiCollection);
        const slipGajiData = [];
        querySnapshot.forEach((doc) => {
          slipGajiData.push({ id: doc.id, ...doc.data() });
        });
        setSlipGajiList(slipGajiData);
      } catch (error) {
        console.error("Error fetching slip gaji:", error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlipGajiList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Slip Gaji</h2>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {slipGajiList.map((slip) => (
              <li key={slip.id} className="mb-4 p-4 border rounded-md">
                <p><strong>Username:</strong> {slip.username}</p>
                <p><strong>Fullname:</strong> {slip.fullname}</p>
                <p><strong>Email:</strong> {slip.email}</p>
                <p><strong>Duration:</strong> {slip.jangka} Bulan</p>
                <p><strong>Bank:</strong> {slip.bank}</p>
                <p><strong>Account Number:</strong> {slip.nomorAkun}</p>
                <p><strong>Tanggal Pengajuan Cuti:</strong> {slip.timeStamp ? new Date(slip.timeStamp.seconds * 1000).toLocaleDateString() : ""}</p>
                <p><strong>Employee ID:</strong> {slip.employeeId}</p>
                <p><strong>Initial Salary:</strong> {slip.salary}</p>
                <p><strong>Salary Cut:</strong> {slip.salaryCut}</p>
                <p><strong>Final Salary:</strong> {slip.finalSalary}</p>
                <p><strong>Golongan:</strong> {slip.golongan}</p>
                <p><strong>Amount:</strong> {slip.amount}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Slipgaji;


