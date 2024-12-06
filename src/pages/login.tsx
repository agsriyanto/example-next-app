import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Login from "@/components/login";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Login />
    </div>
  )
};

export default LoginPage;