// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { saveToken } from "../utils/auth";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         saveToken(data.access_token); // ✅ Save the token
//         navigate("/chat");
//       } else {
//         setError(data.message || "Registration failed.");
//       }
//     } catch (err) {
//       setError("⚠️ Could not connect to the server.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
//       <h1 className="text-3xl font-bold mb-6">📝 Register</h1>

//       <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4 bg-[#151515] p-6 rounded-xl shadow-md border border-white/10">
//         {error && <div className="text-red-400 text-sm">{error}</div>}

//         <div>
//           <label className="block text-sm mb-1">Full Name</label>
//           <input
//             type="text"
//             value={name}
//             required
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none text-white"
//           />
//         </div>

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
//           className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-md font-semibold hover:scale-[1.02] transition"
//         >
//           Register
//         </button>

//         <p className="text-xs text-gray-400 mt-4 text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-purple-400 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }


// Demo

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveUser } from "../utils/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { email, password };
    saveUser(user);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-[#151515] p-6 rounded-xl border border-white/10 space-y-4 max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
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
          className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded font-semibold"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
