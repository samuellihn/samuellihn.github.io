import {Project} from "../lib/contentFetcher"
import styles from "../styles/components/Projects.module.sass"

import {
    faClock
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from "next/link"
import BlurImage from "./BlurImage";

const ProjectCard = (props: { project: Project }) => {
    return (
        <div>
            <Link href={`/projects/${props.project.slug}`}>
                <div className={styles["project-card"]}>
                    <div className={styles["card-image"]}
                         style={{backgroundImage: `url(${props.project.thumbnail})`}}>
                        <div className={styles["blur"]}>
                            <img src={props.project.thumbnail} alt={props.project.title + " thumbnail"}/>
                        </div>
                    </div>
                    <div className={styles["project-card-inner"]}>
                        <h1>{props.project.title}</h1>
                        <span><FontAwesomeIcon icon={faClock}/>{props.project.status}</span>
                        <p>{props.project.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard

