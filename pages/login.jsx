import { Inter } from "next/font/google";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import styles from "@/styles/Register.module.css";
import Link from "next/link";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {};
  const handleSubmit = (e) => {};
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="text-5xl font-bold">
        <h1>Login</h1>
      </div>
      <section className={`${styles.form} my-10 w-screen`}>
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            required
            autoComplete="off"
            onChange={handleChange}
            value={form.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            required
            autoComplete="off"
            onChange={handleChange}
            value={form.password}
            className=""
            style={{
              background: "url(/icons/eye.svg) no-repeat right 1rem center",
              backgroundSize: "1.5rem",
            }}
          />

          <input type="submit" value="Register" />
        </form>
        <div className={`${styles.consent}`}>
          <span>New to plateform?</span>
          <Link
            href="/register"
            className="text-center text-blue-500 underline"
          >
            Register
          </Link>
        </div>{" "}
        <hr className=" border-black border w-[90%] text-center mx-auto" />
      </section>
      <section className="oauth text-center">
        <p>
          <span className="capitalize font-bold text-xl">continue With</span>
        </p>
        <div className="flex justify-center">
          <button
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000/dashboard",
                redirect: true,
              })
            }
            className="shadow-md m-4 rounded-lg p-4 my-4 hover:text-white hover:bg-black hover:shadow-gray-900 "
          >
            <ImGithub size={30} />
          </button>{" "}
          <button
            onClick={() =>
              signIn("facebook", {
                callbackUrl: "http://localhost:3000/dashboard",
                redirect: true,
              })
            }
            className="shadow-md m-4 rounded-lg p-4 my-4 text-[#0866ff] hover:text-white hover:bg-[#0866ff] hover:shadow-gray-900"
          >
            <FaFacebook size={30} />
          </button>
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/dashboard",
                redirect: true,
              })
            }
            className="shadow-md m-4 rounded-lg p-4 my-4 hover:text-white hover:bg-black hover:shadow-gray-900"
          >
            <FcGoogle size={30} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
