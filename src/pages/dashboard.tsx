import React, { useEffect } from "react";
import { useRouter } from "next/router";

import ListUsers from "@/components/listUsers";
import ListPegawai from "@/components/listPegawai";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  
  return (
    <div>
      <nav className="flex justify-between py-2 px-6 bg-teal-400 text-white">
        <p>Dashboard</p>
        <p className="cursor-pointer" onClick={handleLogout}>Logout</p>
      </nav>
      <div className="p-6">
        <ListUsers />
        <ListPegawai />
      </div>
    </div>
  )
};

export default Dashboard;