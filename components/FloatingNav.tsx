import {Component} from "react";
import styles from "../styles/components/Nav.module.sass"
import Link from "next/link"
import {
    faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FloatingNav: (props: {
    entries: { href: string, label: string }[],
    selected: string
}) => JSX.Element = (props) => {
    return (
        <div className={styles["nav"]}>
            <ul>
                {props.entries.map(e => (
                    <li key={e.label}>
                        <Link href={e.href} passHref>
                            <a href={e.href}>
                                <span
                                    className={e.label == props.selected ? `${styles["nav-entry"]} ${styles["selected"]}` : styles["nav-entry"]}>
                                    <span className={styles["bullet"]}>
                                        {">>>>"}
                                    </span>
                                    <span className={styles["label"]}>
                                        {e.label}
                                    </span>
                                </span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FloatingNav;
