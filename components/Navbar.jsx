import React, { useEffect, useState } from "react";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isLognIn, setIsLognIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (session) {
      setIsLognIn(true);
    } else if (session?.user?.role == "admin") {
      setIsAdmin(true);
    } else {
      setIsLognIn(false);
    }
    console.log(isLognIn, "isLognIn");
  }, [session]);

  const router = useRouter();
  const toggleSideBar = (e) => {
    console.log("toggle sidebar");
    e.preventDefault();
    const ul = document.querySelector("#link");
    const openSide = document.querySelector("#openSide");
    const closeSide = document.querySelector("#closeSide");
    ul.classList.toggle(styles.toggle);
    if (ul.classList.contains(styles.toggle)) {
      openSide.style.display = "none";
      closeSide.style.display = "block";
    } else {
      openSide.style.display = "block";
      closeSide.style.display = "none";
    }
  };
  return (
    <nav className={`${styles.nav}`}>
      <div className={`${styles.nav__logo}`}>
        <Link href={"/"}>Logo</Link>
        {/* <h1>Logo</h1> */}
      </div>
      <div className={`${styles.nav__links}`}>
        <ul id="link">
          <li>
            <Link
              className={`${router.pathname == "/" ? `${styles.active}` : ""}`}
              href={"/"}
            >
              {" "}
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${
                router.pathname == "/about" ? `${styles.active}` : ""
              }`}
              href={"/about"}
            >
              {" "}
              About
            </Link>
          </li>
          <li>
            <Link
              className={`${
                router.pathname == "/contact" ? `${styles.active}` : ""
              }`}
              href={"/contact"}
            >
              {" "}
              Contact
            </Link>
          </li>
          {!isLognIn ? (
            <>
              <li>
                <Link
                  className={`${
                    router.pathname == "/client/login" ||
                    router.pathname == "/moderator/login"
                      ? `${styles.active}`
                      : ""
                  }`}
                  href={"/client/login"}
                >
                  {" "}
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    router.pathname == "/client/register" ||
                    router.pathname == "moderator/register"
                      ? `${styles.active}`
                      : ""
                  }`}
                  href={"/client/register"}
                >
                  {" "}
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className={`${
                    router.pathname.includes("/dashboard")
                      ? `${styles.active}`
                      : ""
                  }`}
                  href={`${
                    (router.pathname.includes("moderator") &&
                      "/moderator/dashboard") ||
                    (router.pathname.includes("client") &&
                      "/client/dashboard") ||
                    (isadmin && "/admin/dashboard")
                  }`}
                >
                  {" "}
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: router.pathname.includes("moderator")
                        ? "/moderator/login"
                        : "/client/login",
                    })
                  }
                >
                  {" "}
                  Sign out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* // toggle sidemenu icon */}
      <div className={`${styles.nav__toggle}`}>
        <div className={`${styles.hamburger}`}>
          <button id="openSide" onClick={toggleSideBar}>
            <TiThMenu
              style={{ fontSize: "1.5rem" }}
              size={30}
              color={"#e74c3c"}
            />
          </button>
          <button
            className={`${styles.closeSide}`}
            id="closeSide"
            onClick={toggleSideBar}
          >
            <ImCross
              style={{ fontSize: "1.5rem" }}
              size={30}
              color={"#e74c3c"}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
