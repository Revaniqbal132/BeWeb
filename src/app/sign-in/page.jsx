"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const handleSignIn = async () => {
    try {
      let newErrors = {};
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email address is invalid";
      }
      if (!password) {
        newErrors.password = "Password is required";
      }
      setErrors(newErrors);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          status: "online",
        });
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          if (docSnap.data().role == "user") {
            router.push("/");
          } else if (docSnap.data().role == "admin") {
            router.push("/admin");
          }
          localStorage.setItem(
            "userMSavingProfile",
            JSON.stringify(docSnap.data())
          );
        }
      }
    } catch (error) {
      console.log(error.message);
      let errorMessage = error.message;
      if (errorMessage == "Firebase: Error (auth/invalid-email).") {
        errorMessage = "Email yang anda masukkan salah";
      } else if ((errorMessage = "Firebase: Error (auth/missing-password).")) {
        errorMessage = "Password anda salah";
      } else if (
        (errorMessage = "Firebase: Error (auth/invalid-credential).")
      ) {
        errorMessage = "Email atau password salah";
      }
      setToastMessage(errorMessage);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
        <label className="block mb-4">
          Email:
          <div className="p-3 border rounded my-3">
            <input
              type="text"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Isi email anda disini..."
            />
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </label>
        <label className="block mb-4">
          Password:
          <div className="p-3 border rounded my-3">
            <input
              type="password"
              className="form-input mt-1 block w-full rounded-md outline-none border-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Isi password anda disini..."
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
        </label>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </p>
        {toastMessage && (
          <div className="toast toast-end">
            <div className="alert alert-error">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
