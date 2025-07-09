// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database, auth } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    const dbRef = ref(database, "users");
    onValue(dbRef, (snapshot) => {
      const users = snapshot.val();
      const list = users ? Object.values(users) : [];
      setData(list);
    });
  }, []);

  const handleEdit = (user) => {
    localStorage.setItem("editUser", JSON.stringify(user));
    navigate("/form");
  };

  const handleDelete = (id) => {
    remove(ref(database, "users/" + id))
      .then(() => toast.success("User deleted"))
      .catch(() => toast.error("Failed to delete user"));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/");
      })
      .catch(() => toast.error("Logout failed"));
  };

  const filteredData = data.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (genderFilter === "" || user.gender === genderFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-1/3"
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <Link
          to="/form"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-auto"
        >
          Add New User
        </Link>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="border p-3">#</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Age</th>
              <th className="border p-3">Gender</th>
              <th className="border p-3">Country</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-3 text-center">{index + 1}</td>
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">{user.phone}</td>
                <td className="border p-3">{user.age}</td>
                <td className="border p-3">{user.gender}</td>
                <td className="border p-3">{user.country}</td>
                <td className="border p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
















