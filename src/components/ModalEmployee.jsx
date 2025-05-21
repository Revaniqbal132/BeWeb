import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { hash } from "bcryptjs";
import { db } from "@/firebase/firebase";

const EmployeeModal = ({
  isOpen,
  onClose,
  employeeId = null,
  mode = "add",
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "offline",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetchingEmployee, setFetchingEmployee] = useState(false);

  const isEditMode = mode === "edit" && employeeId;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (isEditMode && isOpen) {
        try {
          setFetchingEmployee(true);
          const employeeDoc = await getDoc(doc(db, "users", employeeId));
          if (employeeDoc.exists()) {
            const employeeData = employeeDoc.data();
            setFormData({
              name: employeeData.name || "",
              email: employeeData.email || "",
              role: employeeData.role || "user",
              status: employeeData.status || "offline",
              password: "",
              confirmPassword: "",
            });
          } else {
            setError("User not found");
          }
        } catch (err) {
          console.error("Error fetching user:", err);
          setError("Failed to load user data");
        } finally {
          setFetchingEmployee(false);
        }
      }
    };

    fetchEmployeeData();
  }, [isEditMode, employeeId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return false;
    }

    if (!isEditMode || formData.password || formData.confirmPassword) {
      if (
        isEditMode &&
        (formData.password || formData.confirmPassword) &&
        (!formData.password || !formData.confirmPassword)
      ) {
        setError("Both password fields must be filled to change password");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    try {
      setLoading(true);

      if (isEditMode) {
        const updateData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          timeStamp: serverTimestamp(),
        };

        if (formData.password) {
          const hashedPassword = await hash(formData.password, 10);
          updateData.password = hashedPassword;
        }

        await updateDoc(doc(db, "users", employeeId), updateData);
        setSuccess(true);
      } else {
        const hashedPassword = await hash(formData.password, 10);
        const newUserId = `user_${Date.now()}`;
        const newUser = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          password: hashedPassword,
          timeStamp: serverTimestamp(),
        };

        await setDoc(doc(db, "users", newUserId), newUser);
        setFormData({
          name: "",
          email: "",
          role: "user",
          status: "offline",
          password: "",
          confirmPassword: "",
        });
        setSuccess(true);
      }

      setTimeout(() => {
        fetchData();
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "adding"} user:`, err);
      setError(
        `Failed to ${isEditMode ? "update" : "add"} user. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditMode ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            User {isEditMode ? "updated" : "added"} successfully!
          </div>
        )}

        {fetchingEmployee ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  {isEditMode ? "New Password (optional)" : "Password"}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="••••••••"
                  required={!isEditMode}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  {isEditMode ? "Confirm New Password" : "Confirm Password"}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="••••••••"
                  required={!isEditMode}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                  ? "Update User"
                  : "Add User"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmployeeModal;
