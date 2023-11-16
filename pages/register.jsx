import { Inter } from "next/font/google";
import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "@/styles/Register.module.css";
import Link from "next/link";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
const Register = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    const data = {
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      password: form.password,
      password2: form.password2,
    };
    console.log(data);
    setForm({
      fname: "",
      lname: "",
      email: "",
      password: "",
      password2: "",
    });
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <section className="text-5xl font-bold ">
        <h1>Register</h1>
      </section>
      <section className={`${styles.form} my-10 w-screen`}>
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="Your First Name"
            required
            autoComplete="off"
            value={form.fname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Your Last Name"
            autoComplete="off"
            required
            onChange={handleChange}
            value={form.lname}
          />
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
          />
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm Password"
            required
            autoComplete="off"
            onChange={handleChange}
            value={form.password2}
          />

          <input type="submit" value="Register" />
        </form>
        <div className={`${styles.consent}`}>
          <span>Already have account?</span>
          <Link href="/login" className="text-center text-blue-500 underline">
            Login
          </Link>
        </div>{" "}
      </section>
    </main>
  );
};

export default Register;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
