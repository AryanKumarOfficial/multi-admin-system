import { Inter } from "next/font/google";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

const Login = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="text-5xl font-bold">
        <h1>Login</h1>
      </div>
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "http://localhost:3000/dashboard",
            redirect: true,
          })
        }
        className="border shadow-md rounded-md p-4 my-4 hover:text-white hover:bg-black hover:shadow-blue-800"
      >
        Login with Github
      </button>
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
