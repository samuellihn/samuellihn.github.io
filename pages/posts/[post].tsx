import {MDXRemote} from "next-mdx-remote";
import {getProjects, Project} from "../../lib/contentFetcher";
import styles from "../../styles/ProjectPage.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import {DateTime} from "luxon";
import BlurImage from "../../components/BlurImage";

export async function getStaticPaths() {
    let projects: Project[] = await getProjects()

    let paths: { params: { project: string } }[] = []
    projects.forEach(
        (p) => paths.push({
            params: {project: p.slug}
        })
    )

    return {
        paths: paths, fallback: false
    };
}

export async function getStaticProps({params}: { params: { project: string } }) {
    let project = (await getProjects()).find((p) => p.slug === params.project)
    return {
        props: {project}
    }
}

const ProjectPage = ({project}: { project: Project }) => {
    return (
        <div className={styles["page"]}>
            <div className={styles["page-inner"]}>
                <h1>{project.title}</h1>
                <div className={styles["split"]}>
                    <div className={styles["main"]}>
                        <h3>{project.description}</h3>
                        <div className={styles["content"]}>
                            <MDXRemote {...project.content}/>
                        </div>
                    </div>
                    <div className={styles["side"]}>
                        <BlurImage src={project.thumbnail ?? ""} maxHeight={"60ex"}/>
                        <div className={styles["sidebar-info"]}>
                            <div>
                                <span>
                                    <FontAwesomeIcon icon={faClock}/>
                                    <h4>Status</h4>
                                </span>
                                <h5>{project.status}</h5>
                            </div>
                            <div>
                                <span>
                                    <FontAwesomeIcon icon={faCalendar}/>
                                    <h4>Started</h4>
                                </span>
                                <h5>{DateTime.fromISO(project.date)?.toFormat("DDD")}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (project.images) ?
                        <div>
                            <h2>Gallery</h2>
                            <div className={styles["gallery"]}>
                                {
                                    project.images?.map((i) => (
                                        <BlurImage src={i}/>
                                    ))
                                }
                            </div>
                        </div> : <div/>
                }
            </div>
        </div>
    )
}

export default ProjectPage