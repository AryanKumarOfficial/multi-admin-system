import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css";
import Link from "next/link";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // check if password matches
    // if (name == "password2" || name == "password") {
    //   setPasswordMatch(form.password == form.password2);
    // }
  };

  useEffect(() => {
    if (form.password == form.password2) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    if (!passwordMatch) {
      toast.error("Passwords do not match");
      return;
    }
    const data = {
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      password: form.password,
      password2: form.password2,
    };
    const res = await fetch("/api/auth/registeruser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const resData = await res.json();
    console.log(resData, "resData");
    if (resData.ok) {
      toast.success(resData.msg);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error(resData.msg);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
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
      <Toaster />
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
            className={`${
              passwordMatch ? "" : "!border-2 focus:!border-red-500"
            } `}
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
            className={`${
              passwordMatch ? "" : "!border-2  focus:!border-red-500"
            } `}
          />
          {!passwordMatch && (
            <p className="text-red-500 w-full text-left text-xs py-2 -mt-4">
              Passwords do not match
            </p>
          )}
          <input type="submit" value="Register" />
        </form>
        <div className={`${styles.consent}`}>
          <span>Already have account?</span>
          <Link href="/login" className="text-center text-blue-500 underline">
            Login
          </Link>
        </div>{" "}
      </section>
      <div className="fixed bottom-10 right-10">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            router.push("/moderator/login");
          }}
        >
          Admin?
        </button>
      </div>
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
