import { useState } from "react";
import axiosInstance from '../../utilis/axiosinstance'
import { API_PATHS } from "../../utilis/apipath";
import { useNavigate } from "react-router";

export default function LoginForm() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()




    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password,
      })

      const { token, role } = response.data

      if (token) {
        localStorage.setItem("token", token)

        if (role === 'admin') {
          navigate("/admin/dashboard")
        } else {
          navigate("/user/dashboard")
        }
      }
      setEmail("")
      setPassword("")

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("something went wrong")
      }
    }

    console.log({ email, password, });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md ">
        {Error && (
          <p className="text-red-500 text-sm mt-2">{Error}</p>
        )}
        {/* Header */}
        <p className="text-[35px] text-black text-center font-medium mb-3.5 -mt-2.5 tracking-wide ">
          Login
        </p>
        <form onSubmit={handleSubmit}>


          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition pr-10"
            />
            <button type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {/* Submit Button */}
          <button type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition duration-150 text-sm tracking-wide shadow-sm"
          >
            Login
          </button>
        </form>
        <div className="m-2.5 ">
          <a navigate ("/signup")
            className="text-[20px] text-blue-400 underline py-2.5"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
