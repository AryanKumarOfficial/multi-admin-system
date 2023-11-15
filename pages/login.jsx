import { Inter } from 'next/font/google'
import React from "react";
const inter = Inter({ subsets: ['latin'] })

const Login = () => {
  return  <main
  className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
>
  <div className="text-5xl font-bold">
    <h1>Login</h1>
  </div>
</main>
};

export default Login;
