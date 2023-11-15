import { Inter } from "next/font/google";
import React from "react";
const inter = Inter({ subsets: ["latin"] });
import styles from "@/styles/Register.module.css";
import Link from "next/link";
const Register = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <section className="text-5xl font-bold ">
        <h1>Register</h1>
      </section>
      <section className={`${styles.form} my-10 w-screen`}>
        <form>
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="Your First Name"
            required
            autoComplete="off"
          />
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Your Last Name"
            autoComplete="off"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm Password"
            required
            autoComplete="off"
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
