// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   doc,
//   setDoc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//         });
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // let updatedFormData = { ...formData, [name]: value };
//     let updatedFormData = { ...formData, [name]: name === 'duration' ? parseInt(value) : value };

//     if (name === "employeeId") {
//       switch (value) {
//         case "11C":
//           updatedFormData.salary = 3000000;
//           updatedFormData.golongan = "Karyawan";
//           break;
//         case "11B":
//           updatedFormData.salary = 5000000;
//           updatedFormData.golongan = "Head Staff";
//           break;
//         case "11A":
//           updatedFormData.salary = 6000000;
//           updatedFormData.golongan = "HRD";
//           break;
//         default:
//           updatedFormData.salary = 0;
//           updatedFormData.golongan = "";
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) {
//         newErrors.username = "Username is required";
//       }
//       if (!formData.fullname) {
//         newErrors.fullname = "Fullname is required";
//       }
//       if (!formData.reason) {
//         newErrors.reason = "reason is required";
//       }
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0) {
//         return;
//       }

//       setIsLoading(true);

//       const userData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         // jangka: parseInt(formData.duration),
//         bank: formData.bank,
//         nomorAkun: formData.accountNumber,
//         // employeeId: formData.employeeId,
//         salary: formData.salary,
//         // golongan: formData.golongan,
//         amount: formData.amount,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//       };

//       // Simpan data pengguna ke Firestore
//       const docRef = doc(db, "usersCuti", formData.email); // Menggunakan email sebagai ID
//       await setDoc(docRef, {
//         ...userData,
//         timeStamp: serverTimestamp(),
//       });

//       router.push("/"); // Redirect setelah pengajuan cuti berhasil

//       localStorage.setItem(
//         "userMSavingProfile",
//         JSON.stringify(userData)
//       );
//       // router.push("/admin/payment"); // Redirect to Payment page after cuti submission

//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//         <h2 className="text-2xl font-semibold mb-6">Data Diri & Pengajuan Cuti</h2>
//         {/* Username Input */}
//         <label className="block mb-4">
//           Username:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="username"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.username}
//               onChange={handleInputChange}
//               placeholder="Isi username anda disini..."
//             />
//             {errors.username && (
//               <p className="text-red-500">{errors.username}</p>
//             )}
//           </div>
//         </label>
//         {/* Fullname Input */}
//         <label className="block mb-4">
//           Fullname:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="fullname"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.fullname}
//               onChange={handleInputChange}
//               placeholder="Isi nama lengkap anda disini..."
//             />
//             {errors.fullname && (
//               <p className="text-red-500">{errors.fullname}</p>
//             )}
//           </div>
//         </label>
//         {/* Email Input */}
//         <label className="block mb-4">
//           Email:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="email"
//               name="email"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Isi email anda disini..."
//             />
//           </div>
//           {errors.email && <p className="text-red-500">{errors.email}</p>}
//         </label>
//         {/* Password Input */}
//         <label className="block mb-4">
//           Password:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="password"
//               name="password"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="Isi password anda disini..."
//             />
//             {errors.password && (
//               <p className="text-red-500">{errors.password}</p>
//             )}
//           </div>
//         </label>
//         {/* Confirm Password Input */}
//         <label className="block mb-4">
//           Confirm Password:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               placeholder="Isi password anda disini..."
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500">{errors.confirmPassword}</p>
//             )}
//           </div>
//         </label>
//         <label className="block mb-4">
//           Bank:
//           <div className="p-3 border rounded my-3">
//             <select
//               name="bank"
//               value={formData.bank}
//               onChange={handleInputChange}
//               className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
//             >
//               <option value="BNI">BNI</option>
//               <option value="BRI">BRI</option>
//               <option value="BCA">BCA</option>
//               <option value="Mandiri">Mandiri</option>
//             </select>
//           </div>
//         </label>
//         {/* Account Number Input */}
//         <label className="block mb-4">
//         Nomor Akun:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="accountNumber"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.accountNumber}
//               onChange={handleInputChange}
//               placeholder="Isi nomor akun anda disini..."
//             />
//             {errors.accountNumber && (
//               <p className="text-red-500">{errors.accountNumber}</p>
//             )}
//           </div>
//         </label>
//         {/* Amount Input */}
//         <label className="block mb-4">
//           Jumlah:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="amount"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.amount}
//               onChange={handleInputChange}
//               placeholder="Isi jumlah cuti anda disini..."
//             />
//           </div>
//         </label>
//         <label className="block mb-4">
//           Reason:
//           <div className="p-3 border rounded my-3">
//             <input
//               type="text"
//               name="reason"
//               className="form-input mt-1 block w-full rounded-md outline-none border-none"
//               value={formData.reason}
//               onChange={handleInputChange}
//               placeholder="Isi reason anda disini..."
//             />
//           </div>
//         </label>
//         <button
//           onClick={handleCuti}
//           className="w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600"
//           disabled={isLoading}
//         >
//           {isLoading ? "Memproses..." : "Ajukan Cuti"}
//         </button>
//         {toastMessage && (
//           <div className="mt-4 p-3 bg-red-500 text-white rounded-md">
//             {toastMessage}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cuti;


//CODE FIX BANGET 2
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   doc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true); // State untuk menandai apakah form harus ditampilkan atau disembunyikan setelah mencapai batas cuti
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//         });

//         const usersCutiCollection = query(
//           collection(db, "usersCuti"),
//           where("email", "==", userData.email)
//         );
//         const cutiSnapshot = await getDocs(usersCutiCollection);
//         setCutiCount(cutiSnapshot.size);

//         // Set isFormVisible berdasarkan jumlah cuti yang sudah ada
//         setIsFormVisible(cutiSnapshot.size < 2);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: name === "duration" ? parseInt(value) : value };

//     if (name === "employeeId") {
//       switch (value) {
//         case "11C":
//           updatedFormData.salary = 3000000;
//           updatedFormData.golongan = "Karyawan";
//           break;
//         case "11B":
//           updatedFormData.salary = 5000000;
//           updatedFormData.golongan = "Head Staff";
//           break;
//         case "11A":
//           updatedFormData.salary = 6000000;
//           updatedFormData.golongan = "HRD";
//           break;
//         default:
//           updatedFormData.salary = 0;
//           updatedFormData.golongan = "";
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) {
//         newErrors.username = "Username is required";
//       }
//       if (!formData.fullname) {
//         newErrors.fullname = "Fullname is required";
//       }
//       if (!formData.reason) {
//         newErrors.reason = "Reason is required";
//       }
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0 || !isFormVisible) {
//         return;
//       }

//       setIsLoading(true);

//       const userData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         bank: formData.bank,
//         accountNumber: formData.accountNumber,
//         salary: formData.salary,
//         amount: formData.amount,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//       };

//       // Simpan data pengguna ke Firestore
//       const docRef = doc(db, "usersCuti", formData.email); // Menggunakan email sebagai ID
//       await setDoc(docRef, {
//         ...userData,
//         timeStamp: serverTimestamp(),
//       });

//       // Menampilkan pesan sukses
//       setToastMessage("Cuti berhasil diajukan.");

//       // Reset form setelah menyimpan data
//       setFormData({
//         username: "",
//         fullname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         reason: "",
//         bank: "BNI",
//         accountNumber: "",
//         salary: 0,
//         amount: "",
//       });

//       // Update cutiCount setelah berhasil mengajukan cuti
//       setCutiCount(cutiCount + 1);

//       // Set isFormVisible menjadi false jika sudah mencapai batas cuti
//       if (cutiCount + 1 >= 2) {
//         setIsFormVisible(false);
//       }
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Data Diri & Pengajuan Cuti</h2>
//           {/* Username Input */}
//           <label className="block mb-4">
//             Username:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="username"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 placeholder="Isi username anda disini..."
//               />
//               {errors.username && (
//                 <p className="text-red-500">{errors.username}</p>
//               )}
//             </div>
//           </label>
//           {/* Fullname Input */}
//           <label className="block mb-4">
//             Fullname:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="fullname"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 placeholder="Isi nama lengkap anda disini..."
//               />
//               {errors.fullname && (
//                 <p className="text-red-500">{errors.fullname}</p>
//               )}
//             </div>
//           </label>
//           {/* Email Input */}
//           <label className="block mb-4">
//             Email:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Isi email anda disini..."
//               />
//             </div>
//             {errors.email && <p className="text-red-500">{errors.email}</p>}
//           </label>
//           {/* Password Input */}
//           <label className="block mb-4">
//             Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Isi password anda disini..."
//               />
//               {errors.password && (
//                 <p className="text-red-500">{errors.password}</p>
//               )}
//             </div>
//           </label>
//           {/* Confirm Password Input */}
//           <label className="block mb-4">
//             Confirm Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 placeholder="Isi password anda disini..."
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500">{errors.confirmPassword}</p>
//               )}
//             </div>
//           </label>
//           <label className="block mb-4">
//             Bank:
//             <div className="p-3 border rounded my-3">
//               <select
//                 name="bank"
//                 value={formData.bank}
//                 onChange={handleInputChange}
//                 className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
//               >
//                 <option value="BNI">BNI</option>
//                 <option value="BRI">BRI</option>
//                 <option value="BCA">BCA</option>
//                 <option value="Mandiri">Mandiri</option>
//               </select>
//             </div>
//           </label>
//           {/* Account Number Input */}
//           <label className="block mb-4">
//             Nomor Akun:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="accountNumber"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.accountNumber}
//                 onChange={handleInputChange}
//                 placeholder="Isi nomor akun anda disini..."
//               />
//               {errors.accountNumber && (
//                 <p className="text-red-500">{errors.accountNumber}</p>
//               )}
//             </div>
//           </label>
//           {/* Amount Input */}
//           <label className="block mb-4">
//             Jumlah:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="amount"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 placeholder="Isi jumlah cuti anda disini..."
//               />
//             </div>
//           </label>
//           <label className="block mb-4">
//             Reason:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="reason"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.reason}
//                 onChange={handleInputChange}
//                 placeholder="Isi reason anda disini..."
//               />
//               {errors.reason && (
//                 <p className="text-red-500">{errors.reason}</p>
//               )}
//             </div>
//           </label>
//           <button
//             onClick={handleCuti}
//             className={`w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Memproses..." : "Ajukan Cuti"}
//           </button>
//           {toastMessage && (
//             <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
//               {toastMessage}
//             </div>
//           )}
//         </div>
//       )}
//       {!isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Anda sudah mencapai batas pengajuan cuti</h2>
//           <p>Anda tidak dapat mengajukan cuti lagi karena sudah mencapai batas pengajuan sebanyak dua kali.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cuti;


//CODE FIX BANGET 5
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   doc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true); // State untuk menandai apakah form harus ditampilkan atau disembunyikan setelah mencapai batas cuti
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//         });

//         const usersCutiCollection = query(
//           collection(db, "usersCuti"),
//           where("email", "==", userData.email)
//         );
//         const cutiSnapshot = await getDocs(usersCutiCollection);
//         setCutiCount(cutiSnapshot.size);

//         // Set isFormVisible berdasarkan jumlah cuti yang sudah ada
//         setIsFormVisible(cutiSnapshot.size < 2);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: name === "duration" ? parseInt(value) : value };

//     if (name === "employeeId") {
//       switch (value) {
//         case "11C":
//           updatedFormData.salary = 3000000;
//           updatedFormData.golongan = "Karyawan";
//           break;
//         case "11B":
//           updatedFormData.salary = 5000000;
//           updatedFormData.golongan = "Head Staff";
//           break;
//         case "11A":
//           updatedFormData.salary = 6000000;
//           updatedFormData.golongan = "HRD";
//           break;
//         default:
//           updatedFormData.salary = 0;
//           updatedFormData.golongan = "";
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) {
//         newErrors.username = "Username is required";
//       }
//       if (!formData.fullname) {
//         newErrors.fullname = "Fullname is required";
//       }
//       if (!formData.reason) {
//         newErrors.reason = "Reason is required";
//       }
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0 || !isFormVisible) {
//         return;
//       }

//       setIsLoading(true);

//       const userData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         bank: formData.bank,
//         accountNumber: formData.accountNumber,
//         salary: formData.salary,
//         amount: formData.amount,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//         // totalCuti: 30, // Menambahkan field totalCuti
//       };

//       // Simpan data pengguna ke Firestore
//       const docRef = doc(db, "usersCuti", formData.email); // Menggunakan email sebagai ID
//       await setDoc(docRef, {
//         ...userData,
//         timeStamp: serverTimestamp(),
//       });

//       // Menampilkan pesan sukses
//       setToastMessage("Cuti berhasil diajukan.");

//       // Reset form setelah menyimpan data
//       setFormData({
//         username: "",
//         fullname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         reason: "",
//         bank: "BNI",
//         accountNumber: "",
//         salary: 0,
//         amount: "",
//       });

//       // Update cutiCount setelah berhasil mengajukan cuti
//       setCutiCount(cutiCount + 1);

//       // Set isFormVisible menjadi false jika sudah mencapai batas cuti
//       if (cutiCount + 1 >= 3) {
//         setIsFormVisible(false);
//       }
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Data Diri & Pengajuan Cuti</h2>
//           {/* Username Input */}
//           <label className="block mb-4">
//             Username:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="username"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 placeholder="Isi username anda disini..."
//               />
//               {errors.username && (
//                 <p className="text-red-500">{errors.username}</p>
//               )}
//             </div>
//           </label>
//           {/* Fullname Input */}
//           <label className="block mb-4">
//             Fullname:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="fullname"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 placeholder="Isi nama lengkap anda disini..."
//               />
//               {errors.fullname && (
//                 <p className="text-red-500">{errors.fullname}</p>
//               )}
//             </div>
//           </label>
//           {/* Email Input */}
//           <label className="block mb-4">
//             Email:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Isi email anda disini..."
//               />
//             </div>
//             {errors.email && <p className="text-red-500">{errors.email}</p>}
//           </label>
//           {/* Password Input */}
//           <label className="block mb-4">
//             Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Isi password anda disini..."
//               />
//               {errors.password && (
//                 <p className="text-red-500">{errors.password}</p>
//               )}
//             </div>
//           </label>
//           {/* Confirm Password Input */}
//           <label className="block mb-4">
//             Confirm Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 placeholder="Isi password anda disini..."
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500">{errors.confirmPassword}</p>
//               )}
//             </div>
//           </label>
//           <label className="block mb-4">
//             Bank:
//             <div className="p-3 border rounded my-3">
//               <select
//                 name="bank"
//                 value={formData.bank}
//                 onChange={handleInputChange}
//                 className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
//               >
//                 <option value="BNI">BNI</option>
//                 <option value="BRI">BRI</option>
//                 <option value="BCA">BCA</option>
//                 <option value="Mandiri">Mandiri</option>
//               </select>
//             </div>
//           </label>
//           {/* Account Number Input */}
//           <label className="block mb-4">
//             Nomor Akun:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="accountNumber"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.accountNumber}
//                 onChange={handleInputChange}
//                 placeholder="Isi nomor akun anda disini..."
//               />
//               {errors.accountNumber && (
//                 <p className="text-red-500">{errors.accountNumber}</p>
//               )}
//             </div>
//           </label>
//           {/* Amount Input */}
//           <label className="block mb-4">
//             Jumlah:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="amount"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 placeholder="Isi jumlah cuti anda disini..."
//               />
//             </div>
//           </label>
//           <label className="block mb-4">
//             Reason:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="reason"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.reason}
//                 onChange={handleInputChange}
//                 placeholder="Isi reason anda disini..."
//               />
//               {errors.reason && (
//                 <p className="text-red-500">{errors.reason}</p>
//               )}
//             </div>
//           </label>
//           <button
//             onClick={handleCuti}
//             className={`w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Memproses..." : "Ajukan Cuti"}
//           </button>
//           {toastMessage && (
//             <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
//               {toastMessage}
//             </div>
//           )}
//         </div>
//       )}
//       {!isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Anda sudah mencapai batas pengajuan cuti</h2>
//           <p>Anda tidak dapat mengajukan cuti lagi karena sudah mencapai batas pengajuan sebanyak dua kali.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cuti;



//CODE FIXXXXXXXXXXXXX
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   doc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   getDoc, // add this to get a single document
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//     startDate: "", // New state for start date
//     endDate: "", // New state for end date
//     totalCuti: 12,
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//           password: userData.password,
//           confirmPassword: userData.password,
//         });

//         const usersCutiCollection = query(
//           collection(db, "usersCuti"),
//           where("email", "==", userData.email)
//         );
//         const cutiSnapshot = await getDocs(usersCutiCollection);
//         setCutiCount(cutiSnapshot.size);

//         setIsFormVisible(cutiSnapshot.size < 2);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === "employeeId") {
//       switch (value) {
//         case "11C":
//           updatedFormData.salary = 3000000;
//           updatedFormData.golongan = "Karyawan";
//           break;
//         case "11B":
//           updatedFormData.salary = 5000000;
//           updatedFormData.golongan = "Head Staff";
//           break;
//         case "11A":
//           updatedFormData.salary = 6000000;
//           updatedFormData.golongan = "HRD";
//           break;
//         default:
//           updatedFormData.salary = 0;
//           updatedFormData.golongan = "";
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   // const handleCuti = async () => {
//   //   try {
//   //     let newErrors = {};
//   //     if (!formData.username) {
//   //       newErrors.username = "Username is required";
//   //     }
//   //     if (!formData.fullname) {
//   //       newErrors.fullname = "Fullname is required";
//   //     }
//   //     if (!formData.reason) {
//   //       newErrors.reason = "Reason is required";
//   //     }
//   //     if (!formData.email) {
//   //       newErrors.email = "Email is required";
//   //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//   //       newErrors.email = "Email address is invalid";
//   //     }
//   //     if (!formData.password) {
//   //       newErrors.password = "Password is required";
//   //     } else if (formData.password !== formData.confirmPassword) {
//   //       newErrors.confirmPassword = "Passwords do not match";
//   //     }
//   //     if (!formData.startDate) {
//   //       newErrors.startDate = "Start date is required";
//   //     }
//   //     if (!formData.endDate) {
//   //       newErrors.endDate = "End date is required";
//   //     } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
//   //       newErrors.endDate = "End date should be after start date";
//   //     }
//   //     setErrors(newErrors);

//   //     if (Object.keys(newErrors).length > 0 || !isFormVisible) {
//   //       return;
//   //     }

//   //     setIsLoading(true);

//   //     // Data for usersCuti collection
//   //     const userData = {
//   //       username: formData.username,
//   //       fullname: formData.fullname,
//   //       email: formData.email,
//   //       reason: formData.reason,
//   //       bank: formData.bank,
//   //       accountNumber: formData.accountNumber,
//   //       salary: formData.salary,
//   //       amount: formData.amount,
//   //       startDate: formData.startDate,
//   //       endDate: formData.endDate,
//   //       role: "user",
//   //       status: "online",
//   //       withDrawalStatus: "nothing",
//   //       balance: 0,
//   //       totalCuti: 0,
//   //     };

//   //     // Data for userPengajuanCuti collection
//   //     const cutiData = {
//   //       username: formData.username,
//   //       fullname: formData.fullname,
//   //       email: formData.email,
//   //       reason: formData.reason,
//   //       bank: formData.bank,
//   //       accountNumber: formData.accountNumber,
//   //       salary: formData.salary,
//   //       amount: formData.amount,
//   //       startDate: formData.startDate,
//   //       endDate: formData.endDate,
//   //       timeStamp: serverTimestamp(),
//   //       status: "pending", // You might want to track status
//   //       totalCuti: 0,
//   //     };

//   //     // Add to usersCuti collection
//   //     const userDocRef = doc(db, "usersCuti", formData.email);
//   //     await setDoc(userDocRef, userData);

//   //     // Add to userPengajuanCuti collection
//   //     const cutiDocRef = doc(db, "userPengajuanCuti", formData.email + "_" + Date.now());
//   //     await setDoc(cutiDocRef, cutiData);

//   //     setToastMessage("Cuti berhasil diajukan.");

//   //     setFormData({
//   //       username: "",
//   //       fullname: "",
//   //       email: "",
//   //       password: "",
//   //       confirmPassword: "",
//   //       reason: "",
//   //       bank: "BNI",
//   //       accountNumber: "",
//   //       salary: 0,
//   //       amount: "",
//   //       startDate: "",
//   //       endDate: "",
//   //       totalCuti: 0,
//   //     });

//   //     setCutiCount(cutiCount + 1);

//   //     if (cutiCount + 1 >= 3) {
//   //       setIsFormVisible(false);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting cuti:", error);
//   //     setToastMessage("Error submitting cuti. Please try again.");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
  


//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) {
//         newErrors.username = "Username is required";
//       }
//       if (!formData.fullname) {
//         newErrors.fullname = "Fullname is required";
//       }
//       if (!formData.reason) {
//         newErrors.reason = "Reason is required";
//       }
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       if (!formData.startDate) {
//         newErrors.startDate = "Start date is required";
//       }
//       if (!formData.endDate) {
//         newErrors.endDate = "End date is required";
//       } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
//         newErrors.endDate = "End date should be after start date";
//       }
//       setErrors(newErrors);
  
//       if (Object.keys(newErrors).length > 0 || !isFormVisible) {
//         return;
//       }
  
//       setIsLoading(true);
  
//       // Get current totalCuti for the user
//       const userDocRef = doc(db, "usersCuti", formData.email);
//       const userDoc = await getDoc(userDocRef);
//       let currentTotalCuti = 12;
//       if (userDoc.exists()) {
//         currentTotalCuti = userDoc.data().totalCuti;
//       }
  
//       const newTotalCuti = currentTotalCuti - parseInt(formData.amount);
  
//       // Data for usersCuti collection
//       const userData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         bank: formData.bank,
//         accountNumber: formData.accountNumber,
//         salary: formData.salary,
//         amount: formData.amount,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//         totalCuti: newTotalCuti,
//       };
  
//       // Data for userPengajuanCuti collection
//       const cutiData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         bank: formData.bank,
//         accountNumber: formData.accountNumber,
//         salary: formData.salary,
//         amount: formData.amount,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         timeStamp: serverTimestamp(),
//         status: "pending", // You might want to track status
//         totalCuti: newTotalCuti,
//       };
  
//       // Add to usersCuti collection
//       await setDoc(userDocRef, userData);
  
//       // Add to userPengajuanCuti collection
//       const cutiDocRef = doc(db, "userPengajuanCuti", formData.email + "_" + Date.now());
//       await setDoc(cutiDocRef, cutiData);
  
//       setToastMessage("Cuti berhasil diajukan.");
  
//       setFormData({
//         username: "",
//         fullname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         reason: "",
//         bank: "BNI",
//         accountNumber: "",
//         salary: 0,
//         amount: "",
//         startDate: "",
//         endDate: "",
//         totalCuti: 12,
//       });
  
//       setCutiCount(cutiCount + 1);
  
//       if (cutiCount + 1 >= 3) {
//         setIsFormVisible(false);
//       }
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Data Diri & Pengajuan Cuti</h2>
//           {/* Username Input */}
//           <label className="block mb-4">
//             Username:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="username"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 placeholder="Isi username anda disini..."
//               />
//               {errors.username && (
//                 <p className="text-red-500">{errors.username}</p>
//               )}
//             </div>
//           </label>
//           {/* Fullname Input */}
//           <label className="block mb-4">
//             Fullname:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="fullname"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 placeholder="Isi nama lengkap anda disini..."
//               />
//               {errors.fullname && (
//                 <p className="text-red-500">{errors.fullname}</p>
//               )}
//             </div>
//           </label>
//           {/* Email Input */}
//           <label className="block mb-4">
//             Email:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Isi email anda disini..."
//               />
//             </div>
//             {errors.email && <p className="text-red-500">{errors.email}</p>}
//           </label>
//           {/* Password Input */}
//           <label className="block mb-4">
//             Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Isi password anda disini..."
//               />
//               {errors.password && (
//                 <p className="text-red-500">{errors.password}</p>
//               )}
//             </div>
//           </label>
//           {/* Confirm Password Input */}
//           <label className="block mb-4">
//             Konfirmasi Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 placeholder="Konfirmasi password..."
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500">{errors.confirmPassword}</p>
//               )}
//             </div>
//           </label>
//           {/* Start Date Input */}
//           <label className="block mb-4">
//             Tanggal Mulai:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="date"
//                 name="startDate"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//               />
//               {errors.startDate && (
//                 <p className="text-red-500">{errors.startDate}</p>
//               )}
//             </div>
//           </label>
//           {/* End Date Input */}
//           <label className="block mb-4">
//             Tanggal Selesai:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="date"
//                 name="endDate"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.endDate}
//                 onChange={handleInputChange}
//               />
//               {errors.endDate && (
//                 <p className="text-red-500">{errors.endDate}</p>
//               )}
//             </div>
//           </label>
//           {/* Bank Input */}
//           <label className="block mb-4">
//             Bank:
//             <div className="p-3 border rounded my-3">
//               <select
//                 name="bank"
//                 value={formData.bank}
//                 onChange={handleInputChange}
//                 className="form-select mt-1 block w-full rounded-md outline-none border-none p-2"
//               >
//                 <option value="BNI">BNI</option>
//                 <option value="BRI">BRI</option>
//                 <option value="BCA">BCA</option>
//                 <option value="Mandiri">Mandiri</option>
//               </select>
//             </div>
//           </label>
//           {/* Account Number Input */}
//           <label className="block mb-4">
//             Nomor Akun:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="accountNumber"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.accountNumber}
//                 onChange={handleInputChange}
//                 placeholder="Isi nomor akun anda disini..."
//               />
//               {errors.accountNumber && (
//                 <p className="text-red-500">{errors.accountNumber}</p>
//               )}
//             </div>
//           </label>
//           {/* Amount Input */}
//           <label className="block mb-4">
//             Jumlah:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="amount"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 placeholder="Isi jumlah cuti anda disini..."
//               />
//             </div>
//           </label>
//           {/* Reason Input */}
//           <label className="block mb-4">
//             Reason:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="reason"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.reason}
//                 onChange={handleInputChange}
//                 placeholder="Isi reason anda disini..."
//               />
//               {errors.reason && (
//                 <p className="text-red-500">{errors.reason}</p>
//               )}
//             </div>
//           </label>
//           <button
//             onClick={handleCuti}
//             className={`w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Memproses..." : "Ajukan Cuti"}
//           </button>
//           {toastMessage && (
//             <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
//               {toastMessage}
//             </div>
//           )}
//         </div>
//       )}
//       {!isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Anda sudah mencapai batas pengajuan cuti</h2>
//           <p>Anda tidak dapat mengajukan cuti lagi karena sudah mencapai batas pengajuan sebanyak dua kali.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cuti;


//update tgl 2 desember 2024
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   doc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//           password: userData.password,
//           confirmPassword: userData.password,
//         });

//         const usersCutiCollection = query(
//           collection(db, "usersCuti"),
//           where("email", "==", userData.email)
//         );
//         const cutiSnapshot = await getDocs(usersCutiCollection);
//         setCutiCount(cutiSnapshot.size);

//         setIsFormVisible(cutiSnapshot.size < 2);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === "employeeId") {
//       switch (value) {
//         case "11C":
//           updatedFormData.salary = 3000000;
//           updatedFormData.golongan = "Karyawan";
//           break;
//         case "11B":
//           updatedFormData.salary = 5000000;
//           updatedFormData.golongan = "Head Staff";
//           break;
//         case "11A":
//           updatedFormData.salary = 6000000;
//           updatedFormData.golongan = "HRD";
//           break;
//         default:
//           updatedFormData.salary = 0;
//           updatedFormData.golongan = "";
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) {
//         newErrors.username = "Username is required";
//       }
//       if (!formData.fullname) {
//         newErrors.fullname = "Fullname is required";
//       }
//       if (!formData.reason) {
//         newErrors.reason = "Reason is required";
//       }
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       if (!formData.startDate) {
//         newErrors.startDate = "Start date is required";
//       }
//       if (!formData.endDate) {
//         newErrors.endDate = "End date is required";
//       } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
//         newErrors.endDate = "End date should be after start date";
//       }
//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0 || !isFormVisible) {
//         return;
//       }

//       setIsLoading(true);

//       // Get current totalCuti for the user
//       const userDocRef = doc(db, "usersCuti", formData.email);
//       const userDoc = await getDoc(userDocRef);
//       let currentTotalCuti = 12; // Initialize to 12 if no document exists
//       if (userDoc.exists()) {
//         currentTotalCuti = userDoc.data().totalCuti || 12; // Use 12 if totalCuti is undefined
//       }

//       const newTotalCuti = Math.max(currentTotalCuti - parseInt(formData.amount), 0);

//       // Data for usersCuti collection
//       const userData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         bank: formData.bank,
//         accountNumber: formData.accountNumber,
//         salary: formData.salary,
//         amount: formData.amount,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//         totalCuti: newTotalCuti,
//       };

//       // Data for userPengajuanCuti collection
//       const cutiData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         bank: formData.bank,
//         accountNumber: formData.accountNumber,
//         salary: formData.salary,
//         amount: formData.amount,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         timeStamp: serverTimestamp(),
//         status: "pending",
//         totalCuti: newTotalCuti,
//       };

//       // Add to usersCuti collection
//       await setDoc(userDocRef, userData);

//       // Add to userPengajuanCuti collection
//       const cutiDocRef = doc(
//         db,
//         "userPengajuanCuti",
//         formData.email + "_" + Date.now()
//       );
//       await setDoc(cutiDocRef, cutiData);

//       setToastMessage("Cuti berhasil diajukan.");

//       setFormData({
//         username: "",
//         fullname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         reason: "",
//         bank: "BNI",
//         accountNumber: "",
//         salary: 0,
//         amount: "",
//         startDate: "",
//         endDate: "",
//       });

//       setCutiCount(cutiCount + 1);

//       if (cutiCount + 1 >= 3) {
//         setIsFormVisible(false);
//       }
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">
//             Data Diri & Pengajuan Cuti
//           </h2>
//           {/* Form Fields */}
//           <form>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm">{errors.username}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Fullname
//               </label>
//               <input
//                 type="text"
//                 name="fullname"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.fullname && (
//                 <p className="text-red-500 text-sm">{errors.fullname}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Reason
//               </label>
//               <textarea
//                 name="reason"
//                 value={formData.reason}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.reason && (
//                 <p className="text-red-500 text-sm">{errors.reason}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Bank
//               </label>
//               <select
//                 name="bank"
//                 value={formData.bank}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               >
//                 <option value="BNI">BNI</option>
//                 <option value="BRI">BRI</option>
//                 <option value="BCA">BCA</option>
//                 <option value="Mandiri">Mandiri</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Account Number
//               </label>
//               <input
//                 type="text"
//                 name="accountNumber"
//                 value={formData.accountNumber}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Amount
//               </label>
//               <input
//                 type="text"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.startDate && (
//                 <p className="text-red-500 text-sm">{errors.startDate}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               />
//               {errors.endDate && (
//                 <p className="text-red-500 text-sm">{errors.endDate}</p>
//               )}
//             </div>
//             <button
//               type="button"
//               onClick={handleCuti}
//               className={`w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600 ${
//                 isLoading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={isLoading}
//             >
//               {isLoading ? "Memproses..." : "Ajukan Cuti"}
//             </button>
//           </form>
//           {toastMessage && (
//             <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
//               {toastMessage}
//             </div>
//           )}
//         </div>
//       )}
//       {!isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">
//             Anda sudah mencapai batas pengajuan cuti
//           </h2>
//           <p>
//             Anda tidak dapat mengajukan cuti lagi karena sudah mencapai batas
//             pengajuan sebanyak dua kali.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cuti;

//update tgl 19 desember 2024
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   doc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//     amountHamil: "",
//     amountLahiran: "",
//     startDate: "",
//     endDate: "",
//     jenisCuti: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//           password: userData.password,
//           confirmPassword: userData.password,
//         });

//         const usersCutiCollection = query(
//           collection(db, "usersCuti"),
//           where("email", "==", userData.email)
//         );
//         const cutiSnapshot = await getDocs(usersCutiCollection);
//         setCutiCount(cutiSnapshot.size);

//         setIsFormVisible(cutiSnapshot.size < 3); // Maksimal 3 pengajuan
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) newErrors.username = "Username is required";
//       if (!formData.fullname) newErrors.fullname = "Fullname is required";
//       if (!formData.reason) newErrors.reason = "Reason is required";
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       if (!formData.startDate) {
//         newErrors.startDate = "Start date is required";
//       }
//       if (!formData.endDate) {
//         newErrors.endDate = "End date is required";
//       } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
//         newErrors.endDate = "End date should be after start date";
//       }
//       if (!formData.jenisCuti) {
//         newErrors.jenisCuti = "Jenis cuti is required";
//       }
//       if (!formData.bank) {
//         newErrors.bank = "Bank is required";
//       }
//       if (!formData.accountNumber) {
//         newErrors.accountNumber = "Account number is required";
//       }

//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0 || !isFormVisible) return;

//       setIsLoading(true);

//       // Get current totalCuti for the user
//       const userDocRef = doc(db, "usersCuti", formData.email);
//       const userDoc = await getDoc(userDocRef);
//       let currentTotalCuti = 12; // Initialize to 12 if no document exists
//       if (userDoc.exists()) {
//         currentTotalCuti = userDoc.data().totalCuti || 12;
//       }

//       // const cutiAmount = 
//       //   formData.jenisCuti === "cuti hamil" ? parseInt(formData.amountHamil || 0) :
//       //   formData.jenisCuti === "cuti lahiran" ? parseInt(formData.amountLahiran || 0) :
//       //   parseInt(formData.amount || 0);

//       // const newTotalCuti = Math.max(currentTotalCuti - cutiAmount, 0);
//       const newTotalCuti = Math.max(currentTotalCuti - parseInt(formData.amount), 0);

//       const userData = {
//         ...formData,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//         totalCuti: newTotalCuti,
//       };

//       // Data for userPengajuanCuti collection
//       const cutiData = {
//         ...userData,
//         timeStamp: serverTimestamp(),
//         status: "pending",
//       };

//       // Add to usersCuti collection
//       await setDoc(userDocRef, userData);

//       // Add to userPengajuanCuti collection
//       const cutiDocRef = doc(
//         db,
//         "userPengajuanCuti",
//         formData.email + "_" + Date.now()
//       );
//       await setDoc(cutiDocRef, cutiData);

//       setToastMessage("Cuti berhasil diajukan.");
//       setFormData({
//         username: "",
//         fullname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         reason: "",
//         bank: "BNI",
//         accountNumber: "",
//         salary: 0,
//         amount: "",
//         amountHamil: "",
//         amountLahiran: "",
//         startDate: "",
//         endDate: "",
//         jenisCuti: "",
//       });

//       setCutiCount(cutiCount + 1);
//       if (cutiCount + 1 >= 3) setIsFormVisible(false);
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">
//             Data Diri & Pengajuan Cuti
//           </h2>
//           <form>
//             {/* Existing Inputs */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Jenis Cuti
//               </label>
//               <select
//                 name="jenisCuti"
//                 value={formData.jenisCuti}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               >
//                 <option value="">Pilih Jenis Cuti</option>
//                 <option value="cuti tahunan">Cuti Tahunan</option>
//                 <option value="cuti hamil">Cuti Hamil</option>
//                 <option value="cuti lahiran">Cuti Lahiran</option>
//               </select>
//               {errors.jenisCuti && (
//                 <p className="text-red-500 text-sm">{errors.jenisCuti}</p>
//               )}
//             </div>
//             {/* Conditional Inputs for Amount */}
//             {formData.jenisCuti === "cuti hamil" && (
//               <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}
//                 <label className="block text-sm font-medium text-gray-700">
//                   Jumlah Hari Cuti Hamil
//                 </label>
//                 <input
//                   type="text"
//                   name="amountHamil"
//                   value={formData.amountHamil}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//             )}
//             {formData.jenisCuti === "cuti lahiran" && (
//               <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}
//                 <label className="block text-sm font-medium text-gray-700">
//                   Jumlah Hari Cuti Lahiran
//                 </label>
//                 <input
//                   type="text"
//                   name="amountLahiran"
//                   value={formData.amountLahiran}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//             )}
//             {formData.jenisCuti === "cuti tahunan" && (
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}

//               </div>
              
//             )}
//             <div className="mt-6">
//               <button
//                 type="button"
//                 onClick={handleCuti}
//                 className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "Ajukan Cuti"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//       {!isFormVisible && (
//         <p className="text-center text-red-600 mt-20">
//           Anda sudah mencapai batas maksimal pengajuan cuti.
//         </p>
//       )}
//       {toastMessage && (
//         <p className="text-center mt-6 text-green-600">{toastMessage}</p>
//       )}
//     </div>
//   );
// };

// export default Cuti;





// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   doc,
//   setDoc,
//   getDocs,
//   getDoc,
//   collection,
//   query,
//   where,
//   updateDoc,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const [submissions, setSubmissions] = useState([]);
//   const [totalCuti, setTotalCuti] = useState(30); // Default value
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//         });

//         const userDocRef = doc(db, "users", userData.email);
//         const cutiSubCollection = collection(userDocRef, "cutiSubmissions");
//         const submissionsSnapshot = await getDocs(cutiSubCollection);
//         const submissionsList = submissionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setSubmissions(submissionsList);

//         // Fetch totalCuti from the user document
//         const userDoc = await getDoc(userDocRef);
//         const userDataFromDb = userDoc.data();
//         if (userDataFromDb && userDataFromDb.totalCuti) {
//           setTotalCuti(userDataFromDb.totalCuti);
//         }

//         // Set isFormVisible based on cutiCount
//         setIsFormVisible(cutiCount < 2);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "amount" ? parseInt(value) : value,
//     });
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) newErrors.username = "Username is required";
//       if (!formData.fullname) newErrors.fullname = "Fullname is required";
//       if (!formData.reason) newErrors.reason = "Reason is required";
//       if (!formData.email) newErrors.email = "Email is required";
//       else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid";
//       if (!formData.password) newErrors.password = "Password is required";
//       else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0 || !isFormVisible) return;

//       setIsLoading(true);

//       const userData = {
//         username: formData.username,
//         fullname: formData.fullname,
//         email: formData.email,
//         reason: formData.reason,
//         bank: formData.bank,
//         accountNumber: formData.accountNumber,
//         salary: formData.salary,
//         amount: formData.amount,
//         timeStamp: serverTimestamp(),
//       };

//       // Save data to Firestore in sub-collection
//       const userDocRef = doc(db, "users", formData.email);
//       const subCollectionRef = collection(userDocRef, "cutiSubmissions");
//       await addDoc(subCollectionRef, userData);

//       // Update cutiCount and totalCuti
//       setCutiCount(cutiCount + 1);

//       // Set isFormVisible based on cutiCount
//       if (cutiCount + 1 >= 2) setIsFormVisible(false);

//       setToastMessage("Cuti berhasil diajukan.");
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAccCuti = async (submissionId, salaryCut) => {
//     try {
//       const userProfile = localStorage.getItem("userProfile");
//       if (!userProfile) return;

//       const userData = JSON.parse(userProfile);
//       const userDocRef = doc(db, "users", userData.email);

//       // Update the totalCuti
//       const newTotalCuti = totalCuti - salaryCut;
//       if (newTotalCuti < 0) {
//         setToastMessage("Total Cuti anda sudah habis.");
//         return;
//       }

//       await updateDoc(userDocRef, { totalCuti: newTotalCuti });

//       // Update the specific cuti submission status
//       const cutiDocRef = doc(db, `users/${userData.email}/cutiSubmissions`, submissionId);
//       await updateDoc(cutiDocRef, { status: "Approved", salaryCut });

//       // Update the state
//       setTotalCuti(newTotalCuti);
//       setToastMessage("Cuti disetujui dan gaji dipotong.");
//     } catch (error) {
//       console.error("Error approving cuti:", error);
//       setToastMessage("Error approving cuti. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Data Diri & Pengajuan Cuti</h2>
//                     {/* Username Input */}
//                     <label className="block mb-4">
//             Username:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="username"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 placeholder="Isi username anda disini..."
//               />
//               {errors.username && (
//                 <p className="text-red-500">{errors.username}</p>
//               )}
//             </div>
//           </label>
//           {/* Fullname Input */}
//           <label className="block mb-4">
//             Fullname:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="fullname"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.fullname}
//                 onChange={handleInputChange}
//                 placeholder="Isi nama lengkap anda disini..."
//               />
//               {errors.fullname && (
//                 <p className="text-red-500">{errors.fullname}</p>
//               )}
//             </div>
//           </label>
//           {/* Email Input */}
//           <label className="block mb-4">
//             Email:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Isi email anda disini..."
//               />
//             </div>
//             {errors.email && <p className="text-red-500">{errors.email}</p>}
//           </label>
//           {/* Password Input */}
//           <label className="block mb-4">
//             Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Isi password anda disini..."
//               />
//               {errors.password && (
//                 <p className="text-red-500">{errors.password}</p>
//               )}
//             </div>
//           </label>
//           {/* Confirm Password Input */}
//           <label className="block mb-4">
//             Confirm Password:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 placeholder="Isi password anda disini..."
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500">{errors.confirmPassword}</p>
//               )}
//             </div>
//           </label>
//           <label className="block mb-4">
//             Bank:
//             <div className="p-3 border rounded my-3">
//               <select
//                 name="bank"
//                 value={formData.bank}
//                 onChange={handleInputChange}
//                 className="form-select mt-1 block w-full rounded-md outline-none border-none"
//               >
//                 <option value="BNI">BNI</option>
//                 <option value="BCA">BCA</option>
//                 <option value="Mandiri">Mandiri</option>
//                 {/* Add more banks as needed */}
//               </select>
//             </div>
//           </label>
//           <label className="block mb-4">
//             Account Number:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="text"
//                 name="accountNumber"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.accountNumber}
//                 onChange={handleInputChange}
//                 placeholder="Isi nomor rekening anda disini..."
//               />
//             </div>
//           </label>
//           <label className="block mb-4">
//             Salary:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="number"
//                 name="salary"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.salary}
//                 onChange={handleInputChange}
//                 placeholder="Isi gaji anda disini..."
//                 disabled
//               />
//             </div>
//           </label>
//           <label className="block mb-4">
//             Amount:
//             <div className="p-3 border rounded my-3">
//               <input
//                 type="number"
//                 name="amount"
//                 className="form-input mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 placeholder="Isi jumlah cuti yang diajukan..."
//               />
//             </div>
//           </label>
//           {/* Reason Input */}
//           <label className="block mb-4">
//             Reason for Leave:
//             <div className="p-3 border rounded my-3">
//               <textarea
//                 name="reason"
//                 className="form-textarea mt-1 block w-full rounded-md outline-none border-none"
//                 value={formData.reason}
//                 onChange={handleInputChange}
//                 placeholder="Isi alasan cuti..."
//               />
//             </div>
//             {errors.reason && <p className="text-red-500">{errors.reason}</p>}
//           </label>
//           {/* Submit Button */}
//           <button
//             type="button"
//             onClick={handleCuti}
//             className="bg-blue-500 text-white py-2 px-4 rounded-md"
//             disabled={isLoading}
//           >
//             {isLoading ? "Submitting..." : "Submit"}
//           </button>
//           {/* Input fields... */}
//           {/* (same as previously provided) */}
//           <button
//             onClick={handleCuti}
//             className={`w-full bg-blue-500 text-white p-3 rounded-md mt-6 hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Memproses..." : "Ajukan Cuti"}
//           </button>
//           {toastMessage && (
//             <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
//               {toastMessage}
//             </div>
//           )}
//         </div>
//       )}
//       {!isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">Anda sudah mencapai batas pengajuan cuti</h2>
//           <p>Anda tidak dapat mengajukan cuti lagi karena sudah mencapai batas pengajuan sebanyak dua kali.</p>
//         </div>
//       )}

//       <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-6">
//         <h2 className="text-2xl font-semibold mb-6">Pengajuan Cuti Anda</h2>
//         {submissions.length === 0 && <p>Tidak ada pengajuan cuti.</p>}
//         {submissions.map(submission => (
//           <div key={submission.id} className="p-3 border rounded my-3">
//             <p><strong>Username:</strong> {submission.username}</p>
//             <p><strong>Fullname:</strong> {submission.fullname}</p>
//             <p><strong>Email:</strong> {submission.email}</p>
//             <p><strong>Reason:</strong> {submission.reason}</p>
//             <p><strong>Amount:</strong> {submission.amount}</p>
//             <p><strong>Status:</strong> {submission.status || "Pending"}</p>
//             {submission.status === "Pending" && (
//               <div className="flex space-x-4 mt-4">
//                 <button
//                   onClick={() => handleAccCuti(submission.id, submission.salary)}
//                   className="bg-green-500 text-white py-2 px-4 rounded-md"
//                 >
//                   Acc Cuti
//                 </button>
//                 <button
//                   onClick={() => handleRejectCuti(submission.id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded-md"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         {totalCuti <= 0 && (
//           <div className="mt-4 p-3 bg-red-500 text-white rounded-md">
//             Total Cuti anda sudah habis.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cuti;

//update tgl 20 desember 20.00 2024
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   doc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//     amountHamil: "",
//     amountLahiran: "",
//     startDate: "",
//     endDate: "",
//     jenisCuti: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//           password: userData.password,
//           confirmPassword: userData.password,
//         });

//         const usersCutiCollection = query(
//           collection(db, "usersCuti"),
//           where("email", "==", userData.email)
//         );
//         const cutiSnapshot = await getDocs(usersCutiCollection);
//         setCutiCount(cutiSnapshot.size);

//         setIsFormVisible(cutiSnapshot.size < 3); // Maksimal 3 pengajuan
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       if (!formData.username) newErrors.username = "Username is required";
//       if (!formData.fullname) newErrors.fullname = "Fullname is required";
//       if (!formData.reason) newErrors.reason = "Reason is required";
//       if (!formData.email) {
//         newErrors.email = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = "Email address is invalid";
//       }
//       if (!formData.password) {
//         newErrors.password = "Password is required";
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//       if (!formData.startDate) {
//         newErrors.startDate = "Start date is required";
//       }
//       if (!formData.endDate) {
//         newErrors.endDate = "End date is required";
//       } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
//         newErrors.endDate = "End date should be after start date";
//       }
//       if (!formData.jenisCuti) {
//         newErrors.jenisCuti = "Jenis cuti is required";
//       }
//       if (!formData.bank) {
//         newErrors.bank = "Bank is required";
//       }
//       if (!formData.accountNumber) {
//         newErrors.accountNumber = "Account number is required";
//       }

//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0 || !isFormVisible) return;

//       setIsLoading(true);

//       // Get current totalCuti for the user
//       const userDocRef = doc(db, "usersCuti", formData.email);
//       const userDoc = await getDoc(userDocRef);
//       let currentTotalCuti = 12; // Initialize to 12 if no document exists
//       if (userDoc.exists()) {
//         currentTotalCuti = userDoc.data().totalCuti || 12;
//       }

//       // const cutiAmount = 
//       //   formData.jenisCuti === "cuti hamil" ? parseInt(formData.amountHamil || 0) :
//       //   formData.jenisCuti === "cuti lahiran" ? parseInt(formData.amountLahiran || 0) :
//       //   parseInt(formData.amount || 0);

//       // const newTotalCuti = Math.max(currentTotalCuti - cutiAmount, 0);
//       const newTotalCuti = Math.max(currentTotalCuti - parseInt(formData.amount), 0);

//       const userData = {
//         ...formData,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//         totalCuti: newTotalCuti,
//       };

//       // Data for userPengajuanCuti collection
//       const cutiData = {
//         ...userData,
//         timeStamp: serverTimestamp(),
//         status: "pending",
//       };

//       // Add to usersCuti collection
//       await setDoc(userDocRef, userData);

//       // Add to userPengajuanCuti collection
//       const cutiDocRef = doc(
//         db,
//         "userPengajuanCuti",
//         formData.email + "_" + Date.now()
//       );
//       await setDoc(cutiDocRef, cutiData);

//       setToastMessage("Cuti berhasil diajukan.");
//       setFormData({
//         username: "",
//         fullname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         reason: "",
//         bank: "BNI",
//         accountNumber: "",
//         salary: 0,
//         amount: "",
//         amountHamil: "",
//         amountLahiran: "",
//         startDate: "",
//         endDate: "",
//         jenisCuti: "",
//       });

//       setCutiCount(cutiCount + 1);
//       if (cutiCount + 1 >= 3) setIsFormVisible(false);
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           <h2 className="text-2xl font-semibold mb-6">
//             Data Diri & Pengajuan Cuti
//           </h2>
//           <form>
//             {/* Existing Inputs */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Jenis Cuti
//               </label>
//               <select
//                 name="jenisCuti"
//                 value={formData.jenisCuti}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               >
//                 <option value="">Pilih Jenis Cuti</option>
//                 <option value="cuti tahunan">Cuti Tahunan</option>
//                 <option value="cuti hamil">Cuti Hamil</option>
//                 <option value="cuti lahiran">Cuti Lahiran</option>
//               </select>
//               {errors.jenisCuti && (
//                 <p className="text-red-500 text-sm">{errors.jenisCuti}</p>
//               )}
//             </div>
//             {/* Conditional Inputs for Amount */}
//             {formData.jenisCuti === "cuti hamil" && (
//               <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}
//                 <label className="block text-sm font-medium text-gray-700">
//                   Jumlah Hari Cuti Hamil
//                 </label>
//                 <input
//                   type="text"
//                   name="amountHamil"
//                   value={formData.amountHamil}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//             )}
//             {formData.jenisCuti === "cuti lahiran" && (
//               <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}
//                 <label className="block text-sm font-medium text-gray-700">
//                   Jumlah Hari Cuti Lahiran
//                 </label>
//                 <input
//                   type="text"
//                   name="amountLahiran"
//                   value={formData.amountLahiran}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//             )}
//             {formData.jenisCuti === "cuti tahunan" && (
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}

//               </div>
              
//             )}
//             <div className="mt-6">
//               <button
//                 type="button"
//                 onClick={handleCuti}
//                 className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "Ajukan Cuti"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//       {!isFormVisible && (
//         <p className="text-center text-red-600 mt-20">
//           Anda sudah mencapai batas maksimal pengajuan cuti.
//         </p>
//       )}
//       {toastMessage && (
//         <p className="text-center mt-6 text-green-600">{toastMessage}</p>
//       )}
//     </div>
//   );
// };

// export default Cuti;

//ini masih berantakan tapi logic semua clear
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   doc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Navbar from "@/components/Navbar";

// const Cuti = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     reason: "",
//     bank: "BNI",
//     accountNumber: "",
//     salary: 0,
//     amount: "",
//     amountHamil: "",
//     amountLahiran: "",
//     startDate: "",
//     endDate: "",
//     jenisCuti: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cutiCount, setCutiCount] = useState(0);
//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userProfile = localStorage.getItem("userProfile");
//       if (userProfile) {
//         const userData = JSON.parse(userProfile);
//         setFormData({
//           ...formData,
//           username: userData.name,
//           fullname: userData.name,
//           email: userData.email,
//           password: userData.password,
//           confirmPassword: userData.password,
//         });

//         const usersCutiCollection = query(
//           collection(db, "usersCuti"),
//           where("email", "==", userData.email)
//         );
//         const cutiSnapshot = await getDocs(usersCutiCollection);
//         setCutiCount(cutiSnapshot.size);

//         setIsFormVisible(cutiSnapshot.size < 3); // Maksimal 3 pengajuan
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCuti = async () => {
//     try {
//       let newErrors = {};
//       // if (!formData.username) newErrors.username = "Username is required";
//       // if (!formData.fullname) newErrors.fullname = "Fullname is required";
//       if (!formData.reason) newErrors.reason = "Reason is required";
//       // if (!formData.email) {
//       //   newErrors.email = "Email is required";
//       // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       //   newErrors.email = "Email address is invalid";
//       // }
//       // if (!formData.password) {
//       //   newErrors.password = "Password is required";
//       // } else if (formData.password !== formData.confirmPassword) {
//       //   newErrors.confirmPassword = "Passwords do not match";
//       // }
//       if (!formData.startDate) {
//         newErrors.startDate = "Start date is required";
//       }
//       if (!formData.endDate) {
//         newErrors.endDate = "End date is required";
//       } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
//         newErrors.endDate = "End date should be after start date";
//       }
//       if (!formData.jenisCuti) {
//         newErrors.jenisCuti = "Jenis cuti is required";
//       }
//       // if (!formData.bank) {
//       //   newErrors.bank = "Bank is required";
//       // }
//       // if (!formData.accountNumber) {
//       //   newErrors.accountNumber = "Account number is required";
//       // }

//       setErrors(newErrors);

//       if (Object.keys(newErrors).length > 0 || !isFormVisible) return;

//       setIsLoading(true);

//       // Get current totalCuti for the user
//       const userDocRef = doc(db, "usersCuti", formData.email);
//       const userDoc = await getDoc(userDocRef);
//       let currentTotalCuti = 12; // Initialize to 12 if no document exists
//       if (userDoc.exists()) {
//         currentTotalCuti = userDoc.data().totalCuti || 12;
//       }

//       // const cutiAmount = 
//       //   formData.jenisCuti === "cuti hamil" ? parseInt(formData.amountHamil || 0) :
//       //   formData.jenisCuti === "cuti lahiran" ? parseInt(formData.amountLahiran || 0) :
//       //   parseInt(formData.amount || 0);

//       // const newTotalCuti = Math.max(currentTotalCuti - cutiAmount, 0);
//       const newTotalCuti = Math.max(currentTotalCuti - parseInt(formData.amount), 0);

//       const userData = {
//         ...formData,
//         role: "user",
//         status: "online",
//         withDrawalStatus: "nothing",
//         balance: 0,
//         totalCuti: newTotalCuti,
//       };

//       // Data for userPengajuanCuti collection
//       const cutiData = {
//         ...userData,
//         timeStamp: serverTimestamp(),
//         status: "pending",
//       };

//       // Add to usersCuti collection
//       await setDoc(userDocRef, userData);

//       // Add to userPengajuanCuti collection
//       const cutiDocRef = doc(
//         db,
//         "userPengajuanCuti",
//         formData.email + "_" + Date.now()
//       );
//       await setDoc(cutiDocRef, cutiData);

//       setToastMessage("Cuti berhasil diajukan.");
//       setFormData({
//         username: "",
//         fullname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         reason: "",
//         bank: "BNI",
//         accountNumber: "",
//         salary: 0,
//         amount: "",
//         amountHamil: "",
//         amountLahiran: "",
//         startDate: "",
//         endDate: "",
//         jenisCuti: "",
//       });

//       setCutiCount(cutiCount + 1);
//       if (cutiCount + 1 >= 3) setIsFormVisible(false);
//     } catch (error) {
//       console.error("Error submitting cuti:", error);
//       setToastMessage("Error submitting cuti. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-sky-200 min-h-screen flex flex-col">
//       <Navbar />
//       {isFormVisible && (
//         <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
//           {/* <h2 className="text-2xl font-semibold mb-6">
//             Data Diri & Pengajuan Cuti
//           </h2> */}
//           <form>
//             {/* Existing Inputs */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Jenis Cuti
//               </label>
//               <select
//                 name="jenisCuti"
//                 value={formData.jenisCuti}
//                 onChange={handleInputChange}
//                 className="mt-1 p-2 block w-full border rounded-md"
//               >
//                 <option value="">Pilih Jenis Cuti</option>
//                 <option value="cuti tahunan">Cuti Tahunan</option>
//                 <option value="cuti hamil">Cuti Hamil</option>
//                 <option value="cuti lahiran">Cuti Lahiran</option>
//               </select>
//               {errors.jenisCuti && (
//                 <p className="text-red-500 text-sm">{errors.jenisCuti}</p>
//               )}
//             </div>
//             {/* Conditional Inputs for Amount */}
//             {formData.jenisCuti === "cuti hamil" && (
//               <div className="mb-4">
//                                 {/* <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )} */}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )} */}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )} */}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}
//                 <label className="block text-sm font-medium text-gray-700">
//                   Jumlah Hari Cuti Hamil
//                 </label>
//                 <input
//                   type="text"
//                   name="amountHamil"
//                   value={formData.amountHamil}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//             )}
//             {formData.jenisCuti === "cuti lahiran" && (
//               <div className="mb-4">
//                                 {/* <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )} */}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}
//                 <label className="block text-sm font-medium text-gray-700">
//                   Jumlah Hari Cuti Lahiran
//                 </label>
//                 <input
//                   type="text"
//                   name="amountLahiran"
//                   value={formData.amountLahiran}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 block w-full border rounded-md"
//                 />
//               </div>
//             )}
//             {formData.jenisCuti === "cuti tahunan" && (
//               <div className="mb-4">
//                 {/* <label className="block text-sm font-medium text-gray-700">
//     Username
//   </label>
//   <input
//     type="text"
//     name="username"
//     value={formData.username}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.username && (
//     <p className="text-red-500 text-sm">{errors.username}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Fullname
//   </label>
//   <input
//     type="text"
//     name="fullname"
//     value={formData.fullname}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.fullname && (
//     <p className="text-red-500 text-sm">{errors.fullname}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Email
//   </label>
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-sm">{errors.email}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Password
//   </label>
//   <input
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.password && (
//     <p className="text-red-500 text-sm">{errors.password}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     Confirm Password
//   </label>
//   <input
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.confirmPassword && (
//     <p className="text-red-500 text-sm">
//       {errors.confirmPassword}
//     </p>
//   )} */}
//   <label className="block text-sm font-medium text-gray-700">
//     Reason
//   </label>
//   <textarea
//     name="reason"
//     value={formData.reason}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.reason && (
//     <p className="text-red-500 text-sm">{errors.reason}</p>
//   )}
//   {/* <label className="block text-sm font-medium text-gray-700">
//     Bank
//   </label>
//   <select
//     name="bank"
//     value={formData.bank}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   >
//     <option value="BNI">BNI</option>
//     <option value="BRI">BRI</option>
//     <option value="BCA">BCA</option>
//     <option value="Mandiri">Mandiri</option>
//   </select>
//   <label className="block text-sm font-medium text-gray-700">
//     Account Number
//   </label>
//   <input
//     type="text"
//     name="accountNumber"
//     value={formData.accountNumber}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   /> */}
//   <label className="block text-sm font-medium text-gray-700">
//       Jumlah Hari Cuti
//     </label>
//     <input
//       type="text"
//       name="amount"
//       value={formData.amount}
//       onChange={handleInputChange}
//       className="mt-1 p-2 block w-full border rounded-md"
//     />
//     <label className="block text-sm font-medium text-gray-700">
//     Start Date
//   </label>
//   <input
//     type="date"
//     name="startDate"
//     value={formData.startDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.startDate && (
//     <p className="text-red-500 text-sm">{errors.startDate}</p>
//   )}
//   <label className="block text-sm font-medium text-gray-700">
//     End Date
//   </label>
//   <input
//     type="date"
//     name="endDate"
//     value={formData.endDate}
//     onChange={handleInputChange}
//     className="mt-1 p-2 block w-full border rounded-md"
//   />
//   {errors.endDate && (
//     <p className="text-red-500 text-sm">{errors.endDate}</p>
//   )}

//               </div>
              
//             )}
//             <div className="mt-6">
//               <button
//                 type="button"
//                 onClick={handleCuti}
//                 className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "Ajukan Cuti"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//       {!isFormVisible && (
//         <p className="text-center text-red-600 mt-20">
//           Anda sudah mencapai batas maksimal pengajuan cuti.
//         </p>
//       )}
//       {toastMessage && (
//         <p className="text-center mt-6 text-green-600">{toastMessage}</p>
//       )}
//     </div>
//   );
// };

// export default Cuti;




"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Navbar from "@/components/Navbar";

const Cuti = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    reason: "",
    bank: "BNI",
    accountNumber: "",
    salary: 0,
    amount: "",
    amountHamil: "",
    amountLahiran: "",
    startDate: "",
    endDate: "",
    jenisCuti: "",
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cutiCount, setCutiCount] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userProfile = localStorage.getItem("userProfile");
      if (userProfile) {
        const userData = JSON.parse(userProfile);
        setFormData({
          ...formData,
          username: userData.name,
          fullname: userData.name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.password,
        });

        const usersCutiCollection = query(
          collection(db, "usersCuti"),
          where("email", "==", userData.email)
        );
        const cutiSnapshot = await getDocs(usersCutiCollection);
        setCutiCount(cutiSnapshot.size);

        setIsFormVisible(cutiSnapshot.size < 3); // Maksimal 3 pengajuan
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCuti = async () => {
    try {
      let newErrors = {};

      if (!formData.reason) newErrors.reason = "Reason is required";

      if (!formData.startDate) {
        newErrors.startDate = "Start date is required";
      }
      if (!formData.endDate) {
        newErrors.endDate = "End date is required";
      } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = "End date should be after start date";
      }
      if (!formData.jenisCuti) {
        newErrors.jenisCuti = "Jenis cuti is required";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0 || !isFormVisible) return;

      setIsLoading(true);

      // Get current totalCuti for the user
      const userDocRef = doc(db, "usersCuti", formData.email);
      const userDoc = await getDoc(userDocRef);
      let currentTotalCuti = 12; // Initialize to 12 if no document exists
      if (userDoc.exists()) {
        currentTotalCuti = userDoc.data().totalCuti || 12;
      }

      // const newTotalCuti = Math.max(currentTotalCuti - cutiAmount, 0);
      const newTotalCuti = Math.max(currentTotalCuti - parseInt(formData.amount), 0);

      const userData = {
        ...formData,
        role: "user",
        status: "online",
        withDrawalStatus: "nothing",
        balance: 0,
        totalCuti: newTotalCuti,
      };

      // Data for userPengajuanCuti collection
      const cutiData = {
        ...userData,
        timeStamp: serverTimestamp(),
        status: "pending",
      };

      // Add to usersCuti collection
      await setDoc(userDocRef, userData);

      // Add to userPengajuanCuti collection
      const cutiDocRef = doc(
        db,
        "userPengajuanCuti",
        formData.email + "_" + Date.now()
      );
      await setDoc(cutiDocRef, cutiData);

      setToastMessage("Cuti berhasil diajukan.");
      setFormData({
        username: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        reason: "",
        bank: "BNI",
        accountNumber: "",
        salary: 0,
        amount: "",
        amountHamil: "",
        amountLahiran: "",
        startDate: "",
        endDate: "",
        jenisCuti: "",
      });

      setCutiCount(cutiCount + 1);
      if (cutiCount + 1 >= 3) setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting cuti:", error);
      setToastMessage("Error submitting cuti. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-200 min-h-screen flex flex-col">
      <Navbar />
      {isFormVisible && (
        <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
          {/* <h2 className="text-2xl font-semibold mb-6">
            Data Diri & Pengajuan Cuti
          </h2> */}
          <form>
            {/* Existing Inputs */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Jenis Cuti
              </label>
              <select
                name="jenisCuti"
                value={formData.jenisCuti}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md"
              >
                <option value="">Pilih Jenis Cuti</option>
                <option value="cuti tahunan">Cuti Tahunan</option>
                <option value="cuti hamil">Cuti Hamil</option>
                <option value="cuti lahiran">Cuti Lahiran</option>
              </select>
              {errors.jenisCuti && (
                <p className="text-red-500 text-sm">{errors.jenisCuti}</p>
              )}
            </div>
            {/* Conditional Inputs for Amount */}
            {formData.jenisCuti === "cuti hamil" && (
              <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Reason
  </label>
  <textarea
    name="reason"
    value={formData.reason}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.reason && (
    <p className="text-red-500 text-sm">{errors.reason}</p>
  )}
  <label className="block text-sm font-medium text-gray-700">
      Jumlah Hari Cuti
    </label>
    <input
      type="text"
      name="amount"
      value={formData.amount}
      onChange={handleInputChange}
      className="mt-1 p-2 block w-full border rounded-md"
    />
    <label className="block text-sm font-medium text-gray-700">
    Start Date
  </label>
  <input
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.startDate && (
    <p className="text-red-500 text-sm">{errors.startDate}</p>
  )}
  <label className="block text-sm font-medium text-gray-700">
    End Date
  </label>
  <input
    type="date"
    name="endDate"
    value={formData.endDate}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.endDate && (
    <p className="text-red-500 text-sm">{errors.endDate}</p>
  )}
                <label className="block text-sm font-medium text-gray-700">
                  Jumlah Hari Cuti Hamil
                </label>
                <input
                  type="text"
                  name="amountHamil"
                  value={formData.amountHamil}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                />
              </div>
            )}
            {formData.jenisCuti === "cuti lahiran" && (
              <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Reason
  </label>
  <textarea
    name="reason"
    value={formData.reason}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.reason && (
    <p className="text-red-500 text-sm">{errors.reason}</p>
  )}
  <label className="block text-sm font-medium text-gray-700">
      Jumlah Hari Cuti
    </label>
    <input
      type="text"
      name="amount"
      value={formData.amount}
      onChange={handleInputChange}
      className="mt-1 p-2 block w-full border rounded-md"
    />
    <label className="block text-sm font-medium text-gray-700">
    Start Date
  </label>
  <input
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.startDate && (
    <p className="text-red-500 text-sm">{errors.startDate}</p>
  )}
  <label className="block text-sm font-medium text-gray-700">
    End Date
  </label>
  <input
    type="date"
    name="endDate"
    value={formData.endDate}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.endDate && (
    <p className="text-red-500 text-sm">{errors.endDate}</p>
  )}
                <label className="block text-sm font-medium text-gray-700">
                  Jumlah Hari Cuti Lahiran
                </label>
                <input
                  type="text"
                  name="amountLahiran"
                  value={formData.amountLahiran}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                />
              </div>
            )}
            {formData.jenisCuti === "cuti tahunan" && (
              <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Reason
  </label>
  <textarea
    name="reason"
    value={formData.reason}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.reason && (
    <p className="text-red-500 text-sm">{errors.reason}</p>
  )}

  <label className="block text-sm font-medium text-gray-700">
      Jumlah Hari Cuti
    </label>
    <input
      type="text"
      name="amount"
      value={formData.amount}
      onChange={handleInputChange}
      className="mt-1 p-2 block w-full border rounded-md"
    />
    <label className="block text-sm font-medium text-gray-700">
    Start Date
  </label>
  <input
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.startDate && (
    <p className="text-red-500 text-sm">{errors.startDate}</p>
  )}
  <label className="block text-sm font-medium text-gray-700">
    End Date
  </label>
  <input
    type="date"
    name="endDate"
    value={formData.endDate}
    onChange={handleInputChange}
    className="mt-1 p-2 block w-full border rounded-md"
  />
  {errors.endDate && (
    <p className="text-red-500 text-sm">{errors.endDate}</p>
  )}

              </div>
              
            )}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleCuti}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Ajukan Cuti"}
              </button>
            </div>
          </form>
        </div>
      )}
      {!isFormVisible && (
        <p className="text-center text-red-600 mt-20">
          Anda sudah mencapai batas maksimal pengajuan cuti.
        </p>
      )}
      {toastMessage && (
        <p className="text-center mt-6 text-green-600">{toastMessage}</p>
      )}
    </div>
  );
};

export default Cuti;