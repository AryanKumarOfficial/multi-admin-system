import React, { useEffect, useState } from "react";
import { getSession, useSession, getProviders } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const Dashboard = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        console.log(session, "session");
        if (session?.user?.role !== "admin") {
            router.push("/admin/login");
        }
    }, [router]);
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
        >
            <div className="text-5xl relative font-bold">
                <h1>Dashboard</h1>
            </div>
            {session && (
                <div className="mt-16">
                    <div className="flex items-center justify-center">
                        <img
                            src={
                                (session?.session?.user?.image?.includes(
                                    "platform-lookaside.fbsbx.com"
                                )
                                    ? "/avtar.png"
                                    : session?.session?.user?.image) ?? "/avtar.png"
                            }
                            alt="profile"
                            className="rounded-full w-24 h-24 border-blue-500 border-4 object-cover p-1"
                        />
                    </div>
                    <div className="mt-5 text-2xl text-center font-bold">
                        <h1>{session?.user?.name}</h1>
                    </div>
                    <div className="mt-5 text-lg text-center font-bold">
                        <h1>{session?.user?.email}</h1>
                    </div>
                </div>
            )}
            {!session && (
                <div className="mt-16">
                    <div className="flex items-center justify-center">
                        <img
                            src="/avtar.png"
                            alt="profile"
                            className="rounded-full w-24 h-24 border-blue-500 border-4 object-cover p-1"
                        />
                    </div>
                    <div className="mt-5 text-2xl text-center font-bold">
                        <h1>Guest</h1>
                    </div>
                    <div className="mt-5 text-lg text-center font-bold">
                        <h1 className="text-red-500 "> You are not logged In!</h1>
                    </div>
                </div>
            )}
        </main>
    );
};
Dashboard.auth = true;

export default Dashboard;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    return {
        props: { pSession: session },
    };
}
