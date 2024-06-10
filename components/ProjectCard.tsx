import {Project} from "../lib/contentFetcher"
import styles from "../styles/components/ProjectCard.module.sass"

import {
    faClock
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from "next/link"
import BlurImage from "./BlurImage";
import ExportedImage from "next-image-export-optimizer";

const ProjectCard = (props: { project: Project }) => {
    return (
        <div>
            <Link href={`/projects/${props.project.slug}`} passHref>
                <div className={styles["project-card"]}>
                    <div className={styles["image-layer"]}>
                        {props.project.images && props.project.images.length > 0 ? (
                            <div className={styles["right-pad"]}>
                                <ExportedImage src={props.project.images[0]} alt={props.project.title + " image"}
                                               fill={true}
                                />
                            </div>
                        ) : (
                            <div className={styles["right-pad"]}>
                                <ExportedImage src={props.project.thumbnail} alt={props.project.title + " image"}
                                               fill={true}
                                />
                            </div>
                        )
                        }
                        <div className={styles["image"]}>
                            <ExportedImage src={props.project.thumbnail} alt={props.project.title + " thumbnail"}
                                           fill={true}
                            />
                        </div>
                        {props.project.images?.filter((n) => n != props.project.thumbnail).slice(1).map(i => (
                            <div className={styles["image"]} key={i}>
                                <ExportedImage src={i} alt={props.project.title + " image"} key={i}
                                               fill={true}
                                />
                            </div>
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

