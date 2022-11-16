import {Project} from "../lib/contentFetcher";
import styles from "../styles/components/Projects.module.sass"
import ProjectCard from "./ProjectCard";

const ProjectView = (props: {projects: Project[]}) => {
    return (
        <div className={styles["project-list"]}>
            {
                props.projects.map((p) => (
                    <ProjectCard project={p} key={p.slug}/>
                    )
                )
            }
        </div>
    )
}

export default ProjectView
