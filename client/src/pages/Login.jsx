// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await api.post("/auth/login", form);
//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token); // save token
//         navigate("/dashboard"); // redirect to dashboard
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div>
//           <label className="block text-sm">Email</label>
//           <input
//             type="email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="input mt-1 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm">Password</label>
//           <input
//             type="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="input mt-1 w-full"
//             required
//           />
//         </div>
//         <button type="submit" className="btn w-full mt-2">Login</button>
//       </form>
//     </div>
//   );
// }






import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { setAuth } from "../utils/auth";  

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/login', form);
        console.log("Login response data:", data);  // 👈 log here
        
      if (data.success) {
        setAuth({ token: data.token, role: data.user.role });
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);

        // Navigate based on role
        if (data.user.role === 'admin') navigate('/dashboard/admin');
        else if (data.user.role === 'teacher') navigate('/dashboard/faculty');
        else navigate('/student/' + data.user.id); // Pass student ID in URL
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={form.email} 
          required
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          required
          onChange={e => setForm({ ...form, password: e.target.value })} 
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
