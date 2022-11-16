import {Component} from "react";
import styles from "../styles/components/Nav.module.sass"
import Link from "next/link"

const FloatingNav: () => JSX.Element = () => {
    return (
        <div className={styles["floating-nav"]}>
            <Link href={"#about"}>
                <span>About</span>
            </Link>
            <Link href={"#Projects"}>
                <span>Projects</span>
            </Link>
            {/*<Link href={"#Posts"}>*/}
            {/*    <span>Posts</span>*/}
            {/*</Link>*/}
        </div>
    )
}

export default FloatingNav;
