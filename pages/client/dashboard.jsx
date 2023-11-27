import React, { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const Dashboard = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      console.log(session);
      if (session?.user?.role === "moderator") {
        router.push("/moderator/dashboard");
      } else if (session?.user?.role === "client") {
        router.push("/client/dashboard");
      }
    }
  }, [session]);
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
                (session?.user?.image?.includes("platform-lookaside.fbsbx.com")
                  ? "/avtar.png"
                  : session?.user?.image) ?? "/avtar.png"
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

export default Dashboard;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
