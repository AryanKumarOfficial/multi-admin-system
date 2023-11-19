import { Inter } from "next/font/google";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import styles from "@/styles/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiAdminFill } from "react-icons/ri";

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
      scope: "moderator",
      callbackUrl: "/moderator/dashboard",
      redirect: true,
    });
    console.log(status, "status");
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="text-4xl font-semibold flex ">
        <RiAdminFill className="inline-block mr-2" />
        <h1>Login</h1>
      </div>
      <section className={`${styles.form} my-10 w-screen`}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            autoComplete="off"
            onChange={handleChange}
            value={form.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            autoComplete="off"
            onChange={handleChange}
            value={form.password}
            className=""
          />

          <input type="submit" value="Login" />
        </form>
        <div className={`${styles.consent}`}>
          <span>Not admin yet!</span>{" "}
          <Link
            href="/moderator/register"
            className="text-center text-blue-500 underline"
          >
            Register
          </Link>
        </div>{" "}
      </section>
      <section className="oauth text-center">
        <div className="fixed bottom-10 right-10">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/client/login")}
          >
            User?
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
