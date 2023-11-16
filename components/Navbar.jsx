import React, { useEffect, useState } from "react";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const router = useRouter();
  const [active, setActive] = useState("Home");
  useEffect(() => {
    if (router.pathname === "/") {
      setActive("Home");
    } else if (router.pathname === "/about") {
      setActive("About");
    } else if (router.pathname === "/contact") {
      setActive("Contact");
    } else if (router.pathname === "/login") {
      setActive("Login");
    } else if (router.pathname === "/register") {
      setActive("Register");
    } else {
      setActive("");
    }
  }, []);
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
          <li>
            <Link
              className={`${
                router.pathname == "/login" ? `${styles.active}` : ""
              }`}
              href={"/login"}
            >
              {" "}
              Login
            </Link>
          </li>
          <li>
            <Link
              className={`${
                router.pathname == "/register" ? `${styles.active}` : ""
              }`}
              href={"/register"}
            >
              {" "}
              Register
            </Link>
          </li>
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
