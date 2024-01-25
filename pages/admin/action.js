import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google"
import { getSession } from 'next-auth/react';


const inter = Inter({ subsets: ["latin"] });
const Action = () => {

    const [moderators, setModerators] = useState([]);
    useEffect(() => {
        const fetchModerators = async () => {
            const res = await fetch(`/api/moderators/fetchmoderators`, {
                method: "GET",
            })
            const data = await res.json();
            setModerators(data?.moderators);
        }

        fetchModerators();

    }, [])

    return (
        <>
            <main
                className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
            >
                {/* table section */}


                <section className="text-gray-600 body-font">
                    <div className="container p-5  mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h2 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Moderators</h2>
                        </div>
                        <div className="lg:min-w-fit w-full mx-auto overflow-auto">
                            <table className="table-auto w-full text-left whitespace-no-wrap text-center">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl ">ID</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Role</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                            Verified
                                        </th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        moderators?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-4 py-3">{item?._id}</td>
                                                    <td className="px-4 py-3">{(item?.firstName).concat(" ", item?.lastName)}</td>
                                                    <td className="px-4 py-3">{item?.email}</td>
                                                    <td className="px-4 py-3 ">{item?.role}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        {item?.isVerified ? (
                                                            <span className="text-green-500 text-center w-full">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-500">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {/* dropdown action is recommended */}
                                                        <div className="flex justify-center space-x-2">
                                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs">
                                                                Verify
                                                            </button>
                                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </section>

            </main >

        </>
    )
}

export default Action

export async function getServerSideProps(context) {
    const { req, res } = context
    const session = await getSession({ req })
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }


    return {
        props: { session }
    }
}