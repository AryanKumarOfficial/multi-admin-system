import { Inter } from "next/font/google";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import styles from "@/styles/Login.module.css";
import Link from "next/link";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, "form");
    const status = await signIn("credentials", {
      email: form.email,
      password: form.password,
      scope: "client",
      callbackUrl: "/client/dashboard",
      redirect: true,
    });
    console.log(status, "status");
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="text-5xl font-bold">
        <h1>Login</h1>
      </div>
      <section className={`${styles.form} my-10 w-screen`}>
        <form onSubmit={handleSubmit}>
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
          />

          <input type="submit" value="Login" />
        </form>
        <div className={`${styles.consent}`}>
          <span>New to plateform?</span>
          <Link
            href="/client/register"
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
                callbackUrl: "/client/dashboard",
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
                callbackUrl: "/client/dashboard",
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
                callbackUrl: "/client/dashboard",
                redirect: true,
              })
            }
            className="shadow-md m-4 rounded-lg p-4 my-4 hover:text-white hover:bg-black hover:shadow-gray-900"
          >
            <FcGoogle size={30} />
          </button>
        </div>
        <div className="fixed bottom-10 right-10">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/moderator/login")}
          >
            Admin?
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
        destination: "/client/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
