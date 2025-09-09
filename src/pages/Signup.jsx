import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchRoles = async () => {
    try {
      const { data } = await api.get("/roles");
      console.log("Roles fetched:", data);  // 👈 log here
      setRoles(data);
      if (data.length > 0) {
        setForm(f => ({ ...f, role: data[0].roleName }));
      }
    } catch (err) {
      console.error("Failed to fetch roles", err);
    }
  };
  fetchRoles();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/signup", form);
      if (data.success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          {roles.map((r) => (
            <option key={r._id} value={r.roleName}>
              {r.roleName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
