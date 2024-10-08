import { Inter } from "next/font/google";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import styles from "@/styles/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiAdminFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { FaCrown } from "react-icons/fa6";

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
        const status = await signIn(
            "credentials",
            {
                email: form.email,
                password: form.password,
                scope: "admin",
                callbackUrl: "/admin/dashboard",
                redirect: false,
            },
            { prompt: "Login" }
        );
        if (status.ok) {
            const setRole = async () => {
                const res = await fetch("/api/auth/fetchrole", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: form?.email }),
                });
                const data = await res.json();
                console.log(data, "data");
            };
            setRole();
            toast.success("Login Successful");
            e.target.reset();
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 3000);
        } else {
            toast.error("Invalid Credentials");
        }
    };
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
        >
            <Toaster />
            <div className="text-4xl font-semibold flex ">
                <FaCrown className="inline-block mr-2" />
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
        </main >
    );
};

export default Login;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/admin/dashboard",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
