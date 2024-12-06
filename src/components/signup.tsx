import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUp = () => {
  const [typePassword, setTypePassword] = useState<'text' | 'password'>('password');
  const [payload, setPayload] = useState({ email: '', password: '', firstName: '', lastName: '', birthDate: '', gender: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleType = (e: { target: { checked: boolean; }; }) => {
    const value = e.target.checked ? "text" : "password";
    setTypePassword(value);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const date = new Date(value);
 
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: name === 'birthDate' ? date.toISOString() : value,
    }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Invalid data');
      }

      const data = await response.json();
      router.replace('/login');

      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log({payload})

  return (
    <div className="grid gap-4 border-solid border-2 border-slate-400 p-10 rounded-md m-auto text-center">
      <p className="mb-3 text-2xl">Register</p>
      <div className="grid-cols-2 gap-3 flex">
        <div>
          <p className="text-sm text-start text-slate-600">Nama Depan</p>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            placeholder="Nama Depan"
            className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none"
          />
        </div>
        <div>
          <p className="text-sm text-start text-slate-600">Nama Belakang</p>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            placeholder="Nama Belakang"
            className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid-cols-2 gap-3 flex">
        <div className="w-full">
          <p className="text-sm text-start text-slate-600">Tanggal Lahir</p>
          <input
            type="date"
            name="birthDate"
            onChange={handleChange}
            placeholder="Tanggal Lahir"
            className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none w-full"
          />
        </div>
        <div>
          <p className="text-sm text-start text-slate-600">Jenis Kelamin</p>
          <input
            type="text"
            name="gender"
            onChange={handleChange}
            placeholder="Jenis Kelamin"
            className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid-cols-2 gap-3 flex">
        <div>
          <p className="text-sm text-start text-slate-600">Email</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none"
          />
        </div>
        <div>
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
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border-slate-200 border-solid border-2 rounded-md hover:border-teal-400 focus:border-teal-400 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <button
          className="bg-teal-400 text-white p-2 rounded-md w-fit px-7 m-auto"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p className="text-sm text-slate-400">
          {"Have an account? "}
          <Link href="/login">
            <span className="text-teal-300 cursor-pointer">Login Here</span>
          </Link>
        </p>
      </div>
    </div>
  )
};

export default SignUp;