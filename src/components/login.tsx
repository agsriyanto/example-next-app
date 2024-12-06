import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [typePassword, setTypePassword] = useState<'text' | 'password'>('password');
  const [payload, setPayload] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const handleType = (e: { target: { checked: boolean; }; }) => {
    const value = e.target.checked ? "text" : "password";
    setTypePassword(value);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      window.location.reload();
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4 border-solid border-2 border-slate-400 p-10 rounded-md m-auto text-center">
      <p className="mb-3 text-2xl">Login</p>
      <div>
        <p className="text-sm text-start text-slate-600">Email</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none"
        />
      </div>
      <div className="grid">
        <div className="flex justify-between">
          <p className="text-sm text-start text-slate-600">Password</p>
          <div className="flex gap-1">
            <input
              type="checkbox"
              onChange={handleType}
            />
            <p className="text-sm text-start text-slate-600">Show</p>
          </div>
        </div>
        <input
          type={typePassword}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none"
        />
      </div>
      <div>
        <button
          className="bg-teal-400 text-white p-2 rounded-md w-fit px-7 m-auto"
          onClick={handleLogin}
          disabled={loading || !payload.email || !payload.password}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <p className="text-sm text-slate-400">
          {"Don't have an account? "}
          <Link href="/signup">
            <span className="text-teal-300 cursor-pointer">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;