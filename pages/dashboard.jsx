import React from "react";
import { getSession } from "next-auth/react";
const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
