"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import useAuth from "@/context/useAuth";
import { db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserList() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && userProfile.role === "user") {
      router.push("/");
    }
  }, [user, userProfile, router]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    // Collect user data and perform necessary operations
    const userData = {
      name: name,
      role: role,
      email: email,
      password: password,
      status: "offline",
    };

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...userData,
        timeStamp: serverTimestamp(),
      });
      document.getElementById("addUserModal").close();
      setName("");
      setRole("user");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavbarAdmin />
      <div className="w-[87%] mx-auto mt-36">
        <div className="flex justify-between items-center gap-3 mb-10">
          <h1 className="text-3xl font-semibold mb-3">User List</h1>
          <input
            type="text"
            placeholder="Search here"
            className="input input-bordered w-full max-w-xs"
          />

          <button
            className="btn bg-teal-600 hover:bg-teal-500 text-white"
            onClick={() => document.getElementById("addUserModal").showModal()}
          >
            Add User
          </button>
          <dialog id="addUserModal" className="modal">
            <div className="modal-box">
              <h3 className="font-semibold text-xl">Add User</h3>
              <form onSubmit={handleAddUser}>
                <div className="py-4">
                  <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Masukkan nama"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="input input-bordered w-full "
                    />
                  </div>
                  <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="role">Role</label>
                    <select
                      name="role"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="select select-bordered w-full"
                    >
                      <option>user</option>
                      <option>admin</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Masukkan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full "
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full "
                      required
                    />
                  </div>
                  <button type="submit" className={`w-full btn bg-teal-500`}>
                    Add User
                  </button>
                </div>
              </form>
              <div className="modal-action">
                <form method="dialog" className="flex gap-1">
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      document.getElementById("addUserModal").close()
                    }
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className="capitalize">{user.fullname}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>
                    <div
                      className={`badge ${
                        user.status == "offline"
                          ? "badge-error"
                          : "badge-accent"
                      }`}
                    >
                      {user.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
