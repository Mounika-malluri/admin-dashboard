import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, push, update, set } from "firebase/database";

const Form = () => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    country: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const editUser = localStorage.getItem("editUser");
    if (editUser) {
      setForm(JSON.parse(editUser));
      localStorage.removeItem("editUser");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      update(ref(database, "users/" + form.id), form);
    } else {
      const newRef = push(ref(database, "users"));
      set(newRef, { ...form, id: newRef.key });
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {form.id ? "Edit" : "Add"} User
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="border p-2 rounded"
            min={0}
          />
          <div className="flex gap-4 items-center">
            <label className="text-gray-700">Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
                required
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={form.gender === "Other"}
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>

          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-4"
          >
            {form.id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

















