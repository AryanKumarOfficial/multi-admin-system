import React from "react";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className={`${styles.nav}`}>
      <div className={`${styles.nav__logo}`}>
        <Link href={"/"}>Logo</Link>
        {/* <h1>Logo</h1> */}
      </div>
      <div className={`${styles.nav__links}`}>
        <ul>
          <li>
            <Link
              className={`${router.pathname == "/" ? "active" : ""}`}
              href={"/"}
            >
              {" "}
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${router.pathname == "/" ? "active" : ""}`}
              href={"/about"}
            >
              {" "}
              About
            </Link>
          </li>
          <li>
            <Link
              className={`${router.pathname == "/" ? "active" : ""}`}
              href={"/contact"}
            >
              {" "}
              Contact
            </Link>
          </li>
          <li>
            <Link
              className={`${router.pathname == "/" ? "active" : ""}`}
              href={"/login"}
            >
              {" "}
              Login
            </Link>
          </li>
          <li>
            <Link
              className={`${router.pathname == "/" ? "active" : ""}`}
              href={"/register"}
            >
              {" "}
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
