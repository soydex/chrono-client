import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiRequest("/auth/register", "POST", form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 need_background">
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            className="w-full p-2 border rounded"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="new-password"
            className="w-full p-2 border rounded"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
