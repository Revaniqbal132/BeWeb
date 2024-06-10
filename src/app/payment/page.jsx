"use client";
import React, { useEffect, useState } from "react";
import { formatRupiah } from "../utility/formatRupiah";
import useAuth from "@/context/useAuth";
import Navbar from "@/components/Navbar";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

const Payment = () => {
  const { user, userProfile, setUserProfile } = useAuth();
  const [isLoading, setIsloading] = useState(false);
  const [warning, setWarning] = useState("");
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const userData = snapshot.docs.map((doc) => doc.data())[0];
          setUserProfile(userData);
          localStorage.setItem("userMSavingProfile", JSON.stringify(userData));
          setLastPaymentDate(userData?.lastPaymentDate || "");
          if (!userData.lastPaymentDate) {
            setWarning("Cuti anda belum di acc");
          } else if (userData.withDrawalStatus === "pending") {
            setWarning("Tunggu konfirmasi pembayaran maksimal 1 x 24 Jam");
          } else {
            setWarning("");
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user, setUserProfile]);

  const handleTransaction = async (amount) => {
    setIsloading(true);
    try {
      const data = {
        id: "MS-" + (user && user.uid) + new Date().getTime(),
        username: user && userProfile.username,
        fullname: user && userProfile.fullname,
        email: user && userProfile.email,
        amount: amount,
      };
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const requestData = await response.json();
      window.snap.pay(requestData.token, {
        onSuccess: async (result) => {
          const newBalance = userProfile.balance + amount;
          await updateUserBalance(newBalance, amount);
        },
      });
    } catch (error) {
      console.error("Error handling transaction:", error);
    }
    setIsloading(false);
  };

  const updateUserBalance = async (newBalance, amount) => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        balance: newBalance,
        lastPaymentDate: new Date(),
      });
      const mutationData = {
        id: `MS-${user.uid}-${Date.now()}`,
        userId: user.uid,
        username: userProfile.fullname,
        bank: userProfile.bank,
        nomorRekening: userProfile.nomorAkun,
        jumlahUang: amount,
        tanggal: new Date(),
        status: "saving",
      };
      await setDoc(doc(db, "mutation", mutationData.id), {
        ...mutationData,
      });
    } catch (error) {
      console.error("Error updating user balance:", error);
      throw new Error("Gagal memperbarui saldo pengguna");
    }
  };

  const handleWithDrawal = async () => {
    try {
      const mutationData = {
        id: `MS-${user.uid}-${Date.now()}`,
        userId: user.uid,
        username: userProfile.fullname,
        bank: userProfile.bank,
        nomorRekening: userProfile.nomorAkun,
        jumlahUang: userProfile.balance,
        tanggal: new Date(),
        status: "withdraw",
      };
      await setDoc(doc(db, "mutation", mutationData.id), { ...mutationData });
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        withDrawalStatus: "pending",
        lastPaymentDate: new Date(),
      });
    } catch (error) {
      console.error("Error handling withdrawal:", error);
      throw new Error("Gagal menangani penarikan dana");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-20 mt-36">
        {isLoading ? (
          <div className="flex justify-center items-center mt-60">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold mb-6">Nama Akun</h1>
            </div>
            <p className="uppercase text-xl font-bold mb-6 text-gray-800">
              {user && userProfile.fullname}
            </p>
            <h1 className="text-2xl font-semibold mb-6">
              Jangka Cuti ({(user && userProfile.jangka) || "Bulan"} Bulan)
            </h1>
            {warning && (
              <div className="p-4 bg-red-100 rounded-2xl text-xl font-semibold mb-8">
                <p>{warning}</p>
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-6 ">Saldo </h2>
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 md:p-10 rounded-2xl text-white flex justify-between items-center">
              <p className="text-3xl md:text-6xl">
                {formatRupiah(user && userProfile.balance)}
              </p>
              {user && userProfile.withDrawalStatus === "pending" ? (
                <div
                  className={`btn text-xl ${
                    userProfile.balance === 0 ? "btn-disabled" : ""
                  } btn-warning animate-pulse`}
                >
                  Pending...
                </div>
              ) : (
                <button
                  className={`btn text-xl ${
                    user && userProfile.balance === 0 ? "btn-disabled" : ""
                  }`}
                  onClick={handleWithDrawal}
                >
                  {user && userProfile.withDrawalStatus === "nothing"
                    ? "Tarik Dana"
                    : "Pending"}
                </button>
              )}
            </div>
            <h2 className="my-10 text-2xl font-semibold">Pemotongan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 mb-10">
              {[300000, 500000, 700000, 1000000].map((amount, index) => (
                <button
                  key={index}
                  className="transition-all duration-500 bg-teal-500 hover:bg-teal-600 p-3 md:p-8 rounded-2xl text-white flex justify-center text-2xl"
                  onClick={() => handleTransaction(amount)}
                >
                  {formatRupiah(amount)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
