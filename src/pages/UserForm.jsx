// src/pages/UserForm.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, set } from "firebase/database"; // ✅ use set instead of update
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

const UserForm = () => {
  const navigate = useNavigate();
  const existingUser = JSON.parse(localStorage.getItem("editUser"));

  const [form, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    country: "",
  });

  useEffect(() => {
    if (existingUser) {
      setFormState(existingUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormState({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = existingUser?.id || uuid();
    const dbRef = ref(database, "users/" + userId);
    const payload = { ...form, id: userId };

    set(dbRef, payload)
      .then(() => {
        toast.success(`User ${existingUser ? "updated" : "added"} successfully`);
        localStorage.removeItem("editUser");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          {existingUser ? "Edit User" : "Add New User"}
        </h2>

        {["name", "email", "phone", "age", "country"].map((field) => (
          <input
            key={field}
            type={field === "age" ? "number" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
        ))}

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          {existingUser ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

