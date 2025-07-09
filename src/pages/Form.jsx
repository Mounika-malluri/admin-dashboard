// src/pages/Form.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const navigate = useNavigate();
  const editUser = JSON.parse(localStorage.getItem("editUser"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    country: "",
  });

  useEffect(() => {
    if (editUser) {
      setForm(editUser);
    }
  }, [editUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = editUser?.id || uuidv4();
    try {
      await set(ref(database, "users/" + id), {
        ...form,
        id,
      });

      toast.success(editUser ? "User updated successfully!" : "User added successfully!");
      localStorage.removeItem("editUser");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Error saving user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          {editUser ? "Edit User" : "Add User"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
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
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded">
          {editUser ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default Form;


















