import {Project} from "../lib/contentFetcher"
import styles from "../styles/components/ProjectCard.module.sass"

import {
    faClock
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from "next/link"
import BlurImage from "./BlurImage";

const ProjectCard = (props: { project: Project }) => {
    return (
        <div>
            <Link href={`/projects/${props.project.slug}`} passHref>
                <div className={styles["project-card"]}>
                    <div className={styles["image-layer"]}>
                        {props.project.images && props.project.images.length > 0 ? (
                            <div className={styles["right-pad"]}
                                 style={{backgroundImage: `url(${props.project.images[0]})`}}/>
                        ) : (<></>)
                        }
                        <img src={props.project.thumbnail} alt={props.project.title + " thumbnail"}/>
                        {props.project.images?.filter((n) => n != props.project.thumbnail).slice(1).map(i => (
                            <img src={i} alt={props.project.title + " image"} key={i}/>
                        ))}

                    </div>
                    <div className={styles["project-card-inner"]}>
                    <div className={styles["text-container"]}>
                            <div className={styles["text"]}>
                                <h1>{props.project.title}</h1>
                                <p>{props.project.description}</p>
                            </div>
                            <div className={styles["window"]}></div>
                        </div>
                        <div className={styles["arrow"]}>
                            <span>{">>"}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard

