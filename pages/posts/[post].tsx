import {MDXRemote} from "next-mdx-remote";
import {getPosts, getProjects, Post, Project} from "../../lib/contentFetcher";
import styles from "../../styles/PostPage.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import {DateTime} from "luxon";
import BlurImage from "../../components/BlurImage";

export async function getStaticPaths() {
    let posts: Post[] = await getPosts()

    let paths: { params: {post: string } }[] = []
    posts.forEach(
        (p) => paths.push({
            params: {post: p.slug}
        })
    )

    return {
        paths: paths, fallback: false
    };
}

export async function getStaticProps({params}: { params: { post: string } }) {
    let post = (await getPosts()).find((p) => p.slug === params.post)
    return {
        props: {post}
    }
}

const ProjectPage = ({post}: { post: Post }) => {
    return (
        <div className={styles["page"]}>
            <div className={styles["page-inner"]}>
                <h1>{post.title}</h1>
                <div className={styles["split"]}>
                    <div className={styles["main"]}>
                        <h3>{post.description}</h3>
                        <div className={styles["content"]}>
                            <MDXRemote {...post.content}/>
                        </div>
                    </div>
                    <div className={styles["side"]}>
                        {
                            post.thumbnail ?
                                <BlurImage src={post.thumbnail ?? ""} maxHeight={"60ex"}/>
                                : <div/>
                        }
                        <div className={styles["sidebar-info"]}>
                            <div>
                                <span>
                                    <FontAwesomeIcon icon={faCalendar}/>
                                    <h4>Published</h4>
                                </span>
                                <h5>{DateTime.fromISO(post.date)?.toFormat("DDD")}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    post.images?.length ?? 0 > 0 ?
                        <div>
                            <h2>Gallery</h2>
                            <div className={styles["gallery"]}>
                                {
                                    post.images?.map((i) => (
                                        <BlurImage src={i} key={i}/>
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