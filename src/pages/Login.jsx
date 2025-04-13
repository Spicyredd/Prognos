// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { saveToken } from "../utils/auth";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         saveToken(data.access_token); // ✅ Store the JWT
//         navigate("/chat");
//       } else {
//         setError(data.message || "Login failed.");
//       }
//     } catch (err) {
//       setError("⚠️ Unable to connect to server.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
//       <h1 className="text-3xl font-bold mb-6">🔐 Login</h1>

//       <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-[#151515] p-6 rounded-xl shadow-md border border-white/10">
//         {error && <div className="text-red-400 text-sm">{error}</div>}

//         <div>
//           <label className="block text-sm mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none text-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm mb-1">Password</label>
//           <input
//             type="password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none text-white"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md font-semibold hover:scale-[1.02] transition"
//         >
//           Login
//         </button>

//         <p className="text-xs text-gray-400 mt-4 text-center">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-purple-400 hover:underline">
//             Register here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }


// Demo 

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveUser, getUser } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const saved = getUser();

    if (!saved || saved.email !== email || saved.password !== password) {
      setError("Invalid credentials.");
    } else {
      saveUser(saved); // Refresh localStorage
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-[#151515] p-6 rounded-xl border border-white/10 space-y-4 max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-white/5 rounded focus:outline-none text-white"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-white/5 rounded focus:outline-none text-white"
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded font-semibold"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
