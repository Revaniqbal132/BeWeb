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
import CalendarComponent from "@/components/CalendarComponent";
import { showToast } from "@/components/Toaster";
import moment from "moment";

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
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userProfile = localStorage.getItem("userProfile");
      setProfile(JSON.parse(userProfile));
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

      if (userDoc.exists()) {
        if (userDoc.data().totalCuti == 0) {
          showToast.error(
            "Pengajuan cuti ditolak karena total cuti Anda saat ini tidak tersedia"
          );
          setIsLoading(false);
          return;
        }
      }

      // const newTotalCuti = Math.max(currentTotalCuti - cutiAmount, 0);
      const newTotalCuti = Math.max(
        currentTotalCuti - parseInt(formData.amount),
        0
      );

      const userData = {
        ...formData,
        startDate: moment(formData.startDate).format("YYYY-MM-DD"),
        endDate: moment(formData.endDate).format("YYYY-MM-DD"),
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

      console.log(cutiData);

      // Add to userPengajuanCuti collection
      const cutiDocRef = doc(
        db,
        "userPengajuanCuti",
        formData.email + "_" + Date.now()
      );
      await setDoc(cutiDocRef, cutiData);

      showToast.success("Cuti berhasil diajukan.");
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
      showToast.error("Error submitting cuti. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-200 items-center justify-center flex min-h-screen ">
      <Navbar />
      {isFormVisible && (
        <div className="p-6 bg-white md:border rounded-md md:shadow-md mt-36 max-xl:w-[90%] lg:w-[70%] max-[768px]:w-[100%]">
          {/* <h2 className="text-2xl font-semibold mb-6">
            Data Diri & Pengajuan Cuti
          </h2> */}
          <form>
            {/* Existing Inputs */}
            <div className="mb-4 ">
              <label className=" text-sm font-medium text-gray-700">
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
                <option
                  disabled={profile.gender == "Laki-laki"}
                  value="cuti hamil"
                >
                  Cuti Hamil
                </option>
                <option
                  disabled={profile.gender == "Laki-laki"}
                  value="cuti lahiran"
                >
                  Cuti Lahiran
                </option>
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
                  Start Date
                </label>
                {/* <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                  min={today}
                /> */}
                <CalendarComponent
                  setFormData={setFormData}
                  name={"startDate"}
                  formData={formData}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <CalendarComponent
                  setFormData={setFormData}
                  name={"endDate"}
                  formData={formData}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">{errors.endDate}</p>
                )}
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
                  Start Date
                </label>
                <CalendarComponent
                  setFormData={setFormData}
                  name={"startDate"}
                  formData={formData}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <CalendarComponent
                  setFormData={setFormData}
                  name={"endDate"}
                  formData={formData}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">{errors.endDate}</p>
                )}

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
                  Start Date
                </label>
                {/* <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                /> */}
                <CalendarComponent
                  setFormData={setFormData}
                  name={"startDate"}
                  formData={formData}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <CalendarComponent
                  setFormData={setFormData}
                  name={"endDate"}
                  formData={formData}
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
