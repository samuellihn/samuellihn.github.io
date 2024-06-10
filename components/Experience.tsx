import {ExperienceEntry} from "../lib/contentFetcher"
import styles from "../styles/components/Experience.module.sass"

import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";

const Experience = (props: { exp: ExperienceEntry }) => {
    return (
        <div className={styles["entry"]} key={props.exp.title}>
            <div className={styles["side"]}>
                <h3>{props.exp.dates}</h3>
            </div>
            <div className={styles["main"]}>
                <h1>{props.exp.title}</h1>
                <h2>{props.exp.company}</h2>
                <MDXRemote {...(props.exp.contentSerialized as MDXRemoteSerializeResult)} />
            </div>
        </div>
    )
}

export default Experience

