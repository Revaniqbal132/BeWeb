// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { db, auth } from "@/firebase/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {
//   collection,
//   doc,
//   serverTimestamp,
//   setDoc,
//   onSnapshot,
//   deleteDoc, // Add this import
// } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const User = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   useEffect(() => {
//     if (user && userProfile.role === "user") {
//       router.push("/");
//     }
//   }, [user, userProfile, router]);
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("user");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "users"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );

//     return () => {
//       unsub();
//     };
//   }, []);

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     if (userProfile.role !== "admin") {
//       console.log("Only admin can add users.");
//       return; // Prevent non-admin users from adding users
//     }

//     const userData = {
//       name: name,
//       role: role,
//       email: email,
//       password: password,
//       status: "offline",
//     };

//     try {
//       const res = await createUserWithEmailAndPassword(
//         auth,
//         userData.email,
//         userData.password
//       );
//       await setDoc(doc(db, "users", res.user.uid), {
//         ...userData,
//         timeStamp: serverTimestamp(),
//       });
//       // Provide user feedback after successful addition
//       alert("User added successfully!");
//       // Clear input fields
//       setName("");
//       setRole("user");
//       setEmail("");
//       setPassword(""); // untuk password menyesuaikan kriteria firebase yaitu harus minimal 6 karakter
//     } catch (error) {
//       console.error("Error adding user:", error);
//       alert("Failed to add user. Please try again later.");
//     }
//   };

//   // const handleEditUser = async () => {
//   //   try {
//   //     const currentUser = auth.currentUser;
//   //     if (!currentUser) {
//   //       alert("User not found. Please log in again.");
//   //       return;
//   //     }
//   //     const newName = prompt("Enter new name:");
//   //     const newRole = prompt("Enter new role:");
//   //     if (!newName || !newRole) {
//   //       alert("Name and role are required.");
//   //       return;
//   //     }
//   //     await setDoc(
//   //       doc(db, "users", currentUser.uid),
//   //       {
//   //         name: newName,
//   //         role: newRole,
//   //       },
//   //       { merge: true }
//   //     );
//   //     alert("Your information has been updated successfully!");
//   //   } catch (error) {
//   //     console.error("Error updating user:", error);
//   //     alert("Failed to update user. Please try again later.");
//   //   }
//   // };

//   // Memperbarui fungsi handleEditUser

//   // Fungsi untuk mengedit pengguna secara keseluruhan
//   const handleEditUser2 = async (selectedUser2) => {
//     // if (!selectedUser) {
//     //   alert("No user selected for editing.");
//     //   return;
//     // }
//     try {
//       const newName = prompt("Enter new name:", selectedUser2.name);
//       const newRole = prompt("Enter new role:", selectedUser2.role);
//       if (!newName || !newRole) {
//         alert("Name and role are required.");
//         return;
//       }
//       await setDoc(
//         doc(db, "users", selectedUser2.id),
//         {
//           name: newName,
//           role: newRole,
//         },
//         { merge: true }
//       );
//       alert("User information updated successfully!");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert("Failed to update user. Please try again later.");
//     }
//   };

//   const handleEditUser = async (selectedUser) => {
//     try {
//       const newName = prompt("Enter new name:", selectedUser.name);
//       const newRole = prompt("Enter new role:", selectedUser.role);
//       if (!newName || !newRole) {
//         alert("Name and role are required.");
//         return;
//       }
//       await setDoc(
//         doc(db, "users", selectedUser.id),
//         {
//           name: newName,
//           role: newRole,
//         },
//         { merge: true }
//       );
//       alert("User information updated successfully!");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert("Failed to update user. Please try again later.");
//     }
//   };

//   // State untuk menyimpan pengguna yang dipilih untuk diedit
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Fungsi untuk mengatur pengguna yang dipilih untuk diedit
//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//   };

//   // Fungsi untuk mengedit pengguna
//   const handleEditUserSet = () => {
//     if (!selectedUser) {
//       alert("No user selected for editing.");
//       return;
//     }
//     // Lakukan logika untuk mengedit pengguna, misalnya mengirim permintaan ke server
//     console.log("Editing user:", selectedUser);
//     // Atau sesuaikan dengan kebutuhan aplikasi Anda
//   };

//   // const handleDeleteUser = async (userId) => {
//   //   try {
//   //     await deleteDoc(doc(db, "users", userId));
//   //     alert("User deleted successfully!");
//   //   } catch (error) {
//   //     console.error("Error deleting user:", error);
//   //     alert("Failed to delete user. Please try again later.");
//   //   }
//   // };

//   const handleDeleteUser = async (userId) => {
//     try {
//       const confirmation = window.confirm(
//         "Apakah Anda yakin ingin menghapus pengguna ini?"
//       );
//       if (confirmation) {
//         await deleteDoc(doc(db, "users", userId));
//         alert("User deleted successfully!");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Failed to delete user. Please try again later.");
//     }
//   };

//   return (
//     <div className="w-[87%] mx-auto mt-32">
//       <NavbarAdmin />

//       <div className="flex justify-between items-center gap-3 mb-10">
//         <h1 className="text-3xl font-semibold mb-3">User List</h1>
//         <input
//           type="text"
//           placeholder="Search here"
//           className="input input-bordered w-full max-w-xs"
//         />

//         <button
//           className="btn bg-teal-600 hover:bg-teal-500 text-white"
//           onClick={() => document.getElementById("addUserModal").showModal()}
//         >
//           Add User
//         </button>
//         <button
//           className="btn bg-green-600 hover:bg-green-500 text-white"
//           onClick={() => {
//             handleSelectUser(user);
//             handleEditUser2();
//           }}
//         >
//           Edit
//         </button>

//         <button
//           className="btn bg-red-600 hover:bg-red-500 text-white"
//           onClick={() => handleDeleteUser(user.id)}
//         >
//           Delete
//         </button>

//         <dialog id="addUserModal" className="modal">
//           <div className="modal-box">
//             <h3 className="font-semibold text-xl">Add User</h3>
//             <form onSubmit={handleAddUser}>
//               <div className="py-4">
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="name">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     placeholder="Masukkan nama"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     className="input input-bordered w-full "
//                   />
//                 </div>
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="role">Role</label>
//                   <select
//                     name="role"
//                     id="role"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     required
//                     className="select select-bordered w-full"
//                   >
//                     <option>user</option>
//                     <option>admin</option>
//                   </select>
//                 </div>
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     placeholder="Masukkan email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="input input-bordered w-full "
//                     required
//                   />
//                 </div>
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="Masukkan password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="input input-bordered w-full "
//                     required
//                   />
//                 </div>
//                 <button type="submit" className={`w-full btn bg-teal-500`}>
//                   Add User
//                 </button>
//               </div>
//             </form>
//             <div className="modal-action">
//               <form method="dialog" className="flex gap-1">
//                 <button
//                   type="button"
//                   className="btn"
//                   onClick={() =>
//                     document.getElementById("addUserModal").close()
//                   }
//                 >
//                   Close
//                 </button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <div
//                     className={`badge ${
//                       user.status == "offline" ? "badge-error" : "badge-accent"
//                     }`}
//                   >
//                     {user.status}
//                   </div>
//                 </td>
//                 <td>
//                   <button
//                     className="btn bg-green-600 hover:bg-green-500 text-white"
//                     onClick={() => handleEditUser(user)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn bg-red-600 hover:bg-red-500 text-white"
//                     onClick={() => handleDeleteUser(user.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Modal untuk pengeditan pengguna */}
//         {selectedUser && (
//           <div className="modal">
//             <div className="modal-box">
//               <h3>Edit User</h3>
//               <form onSubmit={handleEditUserSet}>
//                 {/* Formulir untuk pengeditan */}
//                 <input
//                   type="text"
//                   value={selectedUser.name} // Misalnya, menampilkan nama pengguna yang dipilih untuk diedit
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, name: e.target.value })
//                   }
//                 />
//                 {/* Form input lainnya */}
//                 <button type="submit">Save Changes</button>
//               </form>
//               {/* Tombol untuk menutup modal */}
//               <button onClick={() => setSelectedUser(null)}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;

// "use client"; // Pastikan ini ditulis dengan benar

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import {
//   collection,
//   getDocs,
//   updateDoc as firestoreUpdateDoc,
//   doc as firestoreDoc,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   getDoc
// } from "firebase/firestore";

// import { db } from "@/firebase/firebase";

// const Payment = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     jangka: 0,
//     bank: "BNI",
//     nomorAkun: "",
//     employeeId: "",
//     salary: 0,
//     golongan: "",
//     amount: "",
//     reason: "",
//     timeStamp: null,
//     salaryCut: 0,
//     totalCuti: 0, // Tambahkan totalCuti ke dalam formData
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchLatestUser = async () => {
//       try {
//         setIsLoading(true);

//         // Fetch the latest user document from Firestore
//         const usersCollection = collection(db, "userPengajuanCuti");
//         const q = query(usersCollection, orderBy("timeStamp", "desc"), limit(1));
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const latestDoc = querySnapshot.docs[0];
//           const userDataFromFirestore = latestDoc.data();
//           setFormData({
//             username: userDataFromFirestore.username || "",
//             fullname: userDataFromFirestore.fullname || "",
//             email: userDataFromFirestore.email || "",
//             jangka: userDataFromFirestore.jangka || 0,
//             bank: userDataFromFirestore.bank || "BNI",
//             nomorAkun: userDataFromFirestore.nomorAkun || "",
//             timeStamp: userDataFromFirestore.timeStamp || null,
//             employeeId: userDataFromFirestore.employeeId || "",
//             salary: userDataFromFirestore.salary || 0,
//             golongan: userDataFromFirestore.golongan || "",
//             amount: userDataFromFirestore.amount || "",
//             reason: userDataFromFirestore.reason || "",
//             salaryCut: 0,
//             totalCuti: userDataFromFirestore.totalCuti || 0, // Ambil totalCuti dari firestore jika ada
//           });
//         } else {
//           console.log("No user documents found!");
//         }
//       } catch (error) {
//         console.error("Error fetching latest user:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLatestUser();
//   }, []);

//   const handleAcc = async () => {
//     const {
//       username,
//       fullname,
//       email,
//       jangka,
//       bank,
//       nomorAkun,
//       timeStamp,
//       employeeId,
//       salary,
//       golongan,
//       amount,
//       reason,
//     } = formData;

//     try {
//       setIsLoading(true);

//       // Update document in Firestore
//       const docRef = firestoreDoc(db, "userPengajuanCuti", email);
//       await firestoreUpdateDoc(docRef, {
//         username,
//         fullname,
//         email,
//         jangka: parseInt(jangka),
//         bank,
//         nomorAkun,
//         timeStamp,
//         employeeId,
//         salary,
//         golongan,
//         amount,
//         reason,
//         timeStamp: new Date(),
//       });

//       router.push("/"); // Redirect after successful update
//     } catch (error) {
//       console.error("Error updating document:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAccCuti = async () => {
//     const {
//       username,
//       fullname,
//       email,
//       jangka,
//       bank,
//       nomorAkun,
//       timeStamp,
//       employeeId,
//       salary,
//       golongan,
//       amount,
//       reason,
//       salaryCut,
//       totalCuti, // Ambil totalCuti dari formData
//     } = formData;

//     try {
//       setIsLoading(true);

//       // Ambil data terbaru dari Firestore
//       const docRef = firestoreDoc(db, "userPengajuanCuti", email);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         // const userDataFromFirestore = docSnap.data();
//         // const currentTotalCuti = userDataFromFirestore.totalCuti || 0;

//         // Kurangi salary berdasarkan salary cut
//         const newSalary = salary - parseFloat(salaryCut);

//         // Update total cuti dan gaji baru
//         const updatedTotalCuti = totalCuti - parseFloat(amount);

//         // Update document in Firestore
//         await firestoreUpdateDoc(docRef, {
//           username,
//           fullname,
//           email,
//           jangka: parseInt(jangka),
//           bank,
//           nomorAkun,
//           timeStamp,
//           employeeId,
//           salary: newSalary,
//           golongan,
//           amount,
//           reason,
//           totalCuti,
//           // totalCuti: updatedTotalCuti, // Update totalCuti di Firestore
//           timeStamp: new Date(),
//           diterimaAcc: "Approve", // Tambahkan status diterimaAcc
//         });

//         // Add a new document to slipGaji collection
//         await addDoc(collection(db, "slipGaji"), {
//           username,
//           fullname,
//           email,
//           jangka: parseInt(jangka),
//           bank,
//           nomorAkun,
//           timeStamp: new Date(),
//           employeeId,
//           salary,
//           salaryCut: parseFloat(salaryCut),
//           finalSalary: newSalary,
//           golongan,
//           reason,
//           amount,
//           totalCuti: updatedTotalCuti, // Tambahkan totalCuti ke slipGaji
//         });

//         router.push("/"); // Redirect after successful update
//       } else {
//         console.error("No such document!");
//       }
//     } catch (error) {
//       console.error("Error updating document:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//   };

//   return (
//     <div>
//       <NavbarAdmin />
//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
//         <div className="mt-4">
//           <p><strong>Username:</strong> {formData.username}</p>
//           <p><strong>Fullname:</strong> {formData.fullname}</p>
//           <p><strong>Email:</strong> {formData.email}</p>
//           <p><strong>Bank:</strong> {formData.bank}</p>
//           <p><strong>Account Number:</strong> {formData.nomorAkun}</p>
//           <p><strong>Tanggal Pengajuan Cuti:</strong> {formData.timeStamp ? new Date(formData.timeStamp.seconds * 1000).toLocaleDateString() : ""}</p>
//           <p><strong>Amount:</strong> {formData.amount}</p>
//           <p><strong>Total Cuti:</strong> {formData.totalCuti}</p>
//           <p><strong>Reason:</strong> {formData.reason}</p>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2" htmlFor="salaryCut">
//             Edit Salary Cut:
//           </label>
//           <input
//             type="number"
//             id="salaryCut"
//             value={formData.salaryCut}
//             onChange={handleInputChange}
//             className="form-input mt-1 block w-full rounded-md outline-none border-none p-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2" htmlFor="totalCuti">
//             Total Cuti:
//           </label>
//           <input
//             type="number"
//             id="totalCuti"
//             value={formData.totalCuti}
//             onChange={handleInputChange}
//             className="form-input mt-1 block w-full rounded-md outline-none border-none p-2"
//           />
//         </div>

//         <button
//           onClick={handleAccCuti}
//           className="w-full bg-red-500 text-white p-3 rounded-md mt-6 hover:bg-red-600"
//           disabled={isLoading}
//         >
//           ACC Cuti dan Potong Gaji
//         </button>

//         <button
//           onClick={handleAcc}
//           className="w-full bg-gray-500 text-white p-3 rounded-md mt-6 hover:bg-gray-600"
//           disabled={isLoading}
//         >
//           Take Input Data and Update Firestore
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;

//CODE FIXXXXXXXXXXXXXXX
// "use client"; // Pastikan ini ditulis dengan benar

// import React, { useState, useEffect } from "react";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   updateDoc,
//   getDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Payment = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedIds, setSelectedIds] = useState([]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setIsLoading(true);

//         // Fetch all user documents from Firestore
//         const usersCollection = collection(db, "userPengajuanCuti");
//         const q = query(usersCollection, orderBy("timeStamp", "desc"));
//         const querySnapshot = await getDocs(q);

//         const allData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setData(allData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const handleCheckboxChange = (id) => {
//     setSelectedIds((prevSelectedIds) =>
//       prevSelectedIds.includes(id)
//         ? prevSelectedIds.filter((item) => item !== id)
//         : [...prevSelectedIds, id]
//     );
//   };

//   const handleApproveSelected = async () => {
//     try {
//       const emailToTotalCutiMap = {};

//       for (const id of selectedIds) {
//         const docRef = doc(db, "userPengajuanCuti", id);
//         const docSnap = await getDoc(docRef);
//         const docData = docSnap.data();
//         const userEmail = docData.email;
//         const currentAmount = docData.amount;

//         if (!emailToTotalCutiMap[userEmail]) {
//           emailToTotalCutiMap[userEmail] = docData.totalCuti || 12;
//         }

//         if (currentAmount > 0 && emailToTotalCutiMap[userEmail] >= currentAmount) {
//           emailToTotalCutiMap[userEmail] -= currentAmount;
//         }

//         await updateDoc(docRef, {
//           diterimaAcc: "Approve",
//           totalCuti: emailToTotalCutiMap[userEmail],
//           salary: docData.salary || 40000,
//         });
//       }

//       setData((prevData) =>
//         prevData.map((item) => {
//           if (selectedIds.includes(item.id)) {
//             const updatedTotalCuti = emailToTotalCutiMap[item.email];
//             return { ...item, diterimaAcc: "Approve", totalCuti: updatedTotalCuti, salary: item.salary || 40000 };
//           }
//           return item;
//         })
//       );

//       setSelectedIds([]);
//     } catch (error) {
//       console.error("Error updating documents:", error);
//     }
//   };

//   const handleDeclineSelected = async () => {
//     try {
//       for (const id of selectedIds) {
//         const docRef = doc(db, "userPengajuanCuti", id);
//         await updateDoc(docRef, {
//           diterimaAcc: "Decline",
//         });
//       }

//       setData((prevData) =>
//         prevData.map((item) =>
//           selectedIds.includes(item.id)
//             ? { ...item, diterimaAcc: "Decline" }
//             : item
//         )
//       );

//       setSelectedIds([]);
//     } catch (error) {
//       console.error("Error updating documents:", error);
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <NavbarAdmin />
//       <div className="max-w-9xl mx-auto p-6 bg-sky-300 border rounded-md shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <div className="mb-4 flex space-x-2">
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 onClick={handleApproveSelected}
//                 disabled={selectedIds.length === 0}
//               >
//                 Approve Selected
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 onClick={handleDeclineSelected}
//                 disabled={selectedIds.length === 0}
//               >
//                 Decline Selected
//               </button>
//             </div>
//             <table className="min-w-full bg-white border">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b">Select</th>
//                   <th className="py-2 px-4 border-b">Username</th>
//                   <th className="py-2 px-4 border-b">Fullname</th>
//                   <th className="py-2 px-4 border-b">Email</th>
//                   <th className="py-2 px-4 border-b">Bank</th>
//                   <th className="py-2 px-4 border-b">Total Cuti</th>
//                   <th className="py-2 px-4 border-b">Account Number</th>
//                   <th className="py-2 px-4 border-b">Tanggal Hari ini</th>
//                   <th className="py-2 px-4 border-b">Tanggal Pengajuan Cuti</th>
//                   <th className="py-2 px-4 border-b">Tanggal Akhir Cuti</th>
//                   <th className="py-2 px-4 border-b">Amount</th>
//                   <th className="py-2 px-4 border-b">Salary</th>
//                   <th className="py-2 px-4 border-b">Reason</th>
//                   <th className="py-2 px-4 border-b">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item, index) => (
//                   <tr key={index}>
//                     <td className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.includes(item.id)}
//                         onChange={() => handleCheckboxChange(item.id)}
//                       />
//                     </td>
//                     <td className="py-2 px-4 border-b">{item.username}</td>
//                     <td className="py-2 px-4 border-b">{item.fullname}</td>
//                     <td className="py-2 px-4 border-b">{item.email}</td>
//                     <td className="py-2 px-4 border-b">{item.bank}</td>
//                     <td className="py-2 px-4 border-b">{item.totalCuti}</td>
//                     <td className="py-2 px-4 border-b">{item.accountNumber}</td>
//                     <td className="py-2 px-4 border-b">{item.timeStamp ? new Date(item.timeStamp.seconds * 1000).toLocaleDateString() : ""}</td>
//                     <td className="py-2 px-4 border-b">{item.startDate}</td>
//                     <td className="py-2 px-4 border-b">{item.endDate}</td>
//                     <td className="py-2 px-4 border-b">{item.amount}</td>
//                     <td className="py-2 px-4 border-b">{item.salary}</td>
//                     <td className="py-2 px-4 border-b">{item.reason}</td>
//                     <td className="py-2 px-4 border-b">{item.diterimaAcc || "Pending"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;

//tgl 14 oktober 2024
// "use client";

// import React, { useState, useEffect } from "react";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   updateDoc,
//   getDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Payment = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedIds, setSelectedIds] = useState([]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setIsLoading(true);

//         // Fetch all user documents from Firestore
//         const usersCollection = collection(db, "userPengajuanCuti");
//         const q = query(usersCollection, orderBy("timeStamp", "desc"));
//         const querySnapshot = await getDocs(q);

//         const allData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setData(allData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const handleCheckboxChange = (id) => {
//     setSelectedIds((prevSelectedIds) =>
//       prevSelectedIds.includes(id)
//         ? prevSelectedIds.filter((item) => item !== id)
//         : [...prevSelectedIds, id]
//     );
//   };

//   const handleApproveSelected = async () => {
//     try {
//       const emailToSalaryMap = {};

//       // Collect data and compute salary for each user
//       for (const id of selectedIds) {
//         const docRef = doc(db, "userPengajuanCuti", id);
//         const docSnap = await getDoc(docRef);
//         const docData = docSnap.data();
//         const userEmail = docData.email;
//         const currentAmount = docData.amount;
//         const currentSalary = docData.salary || 40000;

//         // Initialize map for the user email if not present
//         if (!emailToSalaryMap[userEmail]) {
//           emailToSalaryMap[userEmail] = 0;
//         }

//         // Accumulate salary based on the leave request amount
//         if (currentAmount > 0) {
//           emailToSalaryMap[userEmail] += currentAmount * currentSalary;
//         }

//         // Update document status to "Approve"
//         await updateDoc(docRef, {
//           diterimaAcc: "Approve",
//           salary: emailToSalaryMap[userEmail],
//         });
//       }

//       // Update state with the new data
//       setData((prevData) =>
//         prevData.map((item) => {
//           if (selectedIds.includes(item.id)) {
//             const updatedSalary = emailToSalaryMap[item.email] || item.salary;
//             return {
//               ...item,
//               diterimaAcc: "Approve",
//               salary: updatedSalary,
//             };
//           }
//           return item;
//         })
//       );

//       // Clear selected IDs after updating
//       setSelectedIds([]);
//     } catch (error) {
//       console.error("Error updating documents:", error);
//     }
//   };

//   const handleDeclineSelected = async () => {
//     try {
//       for (const id of selectedIds) {
//         const docRef = doc(db, "userPengajuanCuti", id);
//         await updateDoc(docRef, {
//           diterimaAcc: "Decline",
//         });
//       }

//       // Update state with declined status
//       setData((prevData) =>
//         prevData.map((item) =>
//           selectedIds.includes(item.id)
//             ? { ...item, diterimaAcc: "Decline" }
//             : item
//         )
//       );

//       // Clear selected IDs after updating
//       setSelectedIds([]);
//     } catch (error) {
//       console.error("Error updating documents:", error);
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <NavbarAdmin />
//       <div className="max-w-9xl mx-auto p-6 bg-sky-300 border rounded-md shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Payment Page</h2>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <div className="mb-4 flex space-x-2">
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 onClick={handleApproveSelected}
//                 disabled={selectedIds.length === 0}
//               >
//                 Approve Selected
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 onClick={handleDeclineSelected}
//                 disabled={selectedIds.length === 0}
//               >
//                 Decline Selected
//               </button>
//             </div>
//             <table className="min-w-full bg-white border">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b">Select</th>
//                   <th className="py-2 px-4 border-b">Username</th>
//                   <th className="py-2 px-4 border-b">Fullname</th>
//                   <th className="py-2 px-4 border-b">Email</th>
//                   <th className="py-2 px-4 border-b">Bank</th>
//                   <th className="py-2 px-4 border-b">Total Cuti</th>
//                   <th className="py-2 px-4 border-b">Account Number</th>
//                   <th className="py-2 px-4 border-b">Tanggal Hari ini</th>
//                   <th className="py-2 px-4 border-b">Tanggal Pengajuan Cuti</th>
//                   <th className="py-2 px-4 border-b">Tanggal Akhir Cuti</th>
//                   <th className="py-2 px-4 border-b">Amount</th>
//                   <th className="py-2 px-4 border-b">Salary</th>
//                   <th className="py-2 px-4 border-b">Reason</th>
//                   <th className="py-2 px-4 border-b">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item, index) => (
//                   <tr key={index}>
//                     <td className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.includes(item.id)}
//                         onChange={() => handleCheckboxChange(item.id)}
//                       />
//                     </td>
//                     <td className="py-2 px-4 border-b">{item.username}</td>
//                     <td className="py-2 px-4 border-b">{item.fullname}</td>
//                     <td className="py-2 px-4 border-b">{item.email}</td>
//                     <td className="py-2 px-4 border-b">{item.bank}</td>
//                     <td className="py-2 px-4 border-b">{item.totalCuti}</td>
//                     <td className="py-2 px-4 border-b">{item.accountNumber}</td>
//                     <td className="py-2 px-4 border-b">{item.timeStamp ? new Date(item.timeStamp.seconds * 1000).toLocaleDateString() : ""}</td>
//                     <td className="py-2 px-4 border-b">{item.startDate}</td>
//                     <td className="py-2 px-4 border-b">{item.endDate}</td>
//                     <td className="py-2 px-4 border-b">{item.amount}</td>
//                     <td className="py-2 px-4 border-b">{item.salary}</td>
//                     <td className="py-2 px-4 border-b">{item.reason}</td>
//                     <td className="py-2 px-4 border-b">{item.diterimaAcc || "Pending"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;

//update tgl 20 desember 2024
"use client";

import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
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

const Payment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
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

    fetchAllData();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((item) => item !== id)
        : [...prevSelectedIds, id]
    );
  };
  const handleApproveSelected = async () => {
    try {
      const emailToSalaryMap = {};
      for (const id of selectedIds) {
        const docRef = doc(db, "userPengajuanCuti", id);

        await updateDoc(docRef, {
          // diterimaAcc: "Approve",
          status: "Approve",
        });
      }

      setData((prevData) =>
        prevData.map((item) => {
          if (selectedIds.includes(item.id)) {
            const updatedSalary = emailToSalaryMap[item.email] || item.salary;
            return {
              ...item,
              // diterimaAcc: "Approve",
              status: "Approve",
              salary: updatedSalary,
            };
          }
          return item;
        })
      );
      showToast.success('Data berhasil di approve')
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
          // diterimaAcc: "Decline",
          status: "Decline",
        });
      }

      setData((prevData) =>
        prevData.map((item) =>
          selectedIds.includes(item.id)
            ? // ? { ...item, diterimaAcc: "Decline" }
              { ...item, status: "Decline" }
            : item
        )
      );

      setSelectedIds([]);
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };

  console.log(data)

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
              <div>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setData={setFilteredData}
                  data={data}
                />
              </div>
              <div>
                <button
                  className="bg-green-500 text-white mr-2 px-4 py-2 rounded hover:bg-green-600"
                  onClick={handleApproveSelected}
                  disabled={selectedIds.length === 0}
                >
                  Approve Selected
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDeclineSelected}
                  disabled={selectedIds.length === 0}
                >
                  Decline Selected
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.length === 0
                ? data.map((item) => (
                    <EmployeeCard
                      selectedIds={selectedIds}
                      employee={item}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  ))
                : filteredData.map((item) => (
                    <EmployeeCard
                      selectedIds={selectedIds}
                      employee={item}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
