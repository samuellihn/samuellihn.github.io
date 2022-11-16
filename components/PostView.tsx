import {Post} from "../lib/contentFetcher";
import styles from "../styles/components/Posts.module.sass"
import PostCard from "./PostCard"

const PostView = (props: { posts: Post[] }) => {
    return (
        <div className={styles["post-list"]}>
            {
                props.posts.map((p) => <PostCard post={p} key={p.slug}/>)
            }
        </div>
    )
}

export default PostView
