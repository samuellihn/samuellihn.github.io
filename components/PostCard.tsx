import {Post} from "../lib/contentFetcher"
import styles from "../styles/components/Posts.module.sass"

import {
    faClock
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from "next/link"
import {DateTime} from "luxon";

const PostCard = (props: { post: Post }) => {
    return (
        <div>
            <Link href={`/posts/${props.post.slug}`}>
                <div className={styles["post-card"]}>
                    {
                        props.post.thumbnail ?
                            <img src={props.post.thumbnail} alt={props.post.title + " thumbnail"}/>
                            :
                            <div/>
                    }
                    <div className={styles["post-card-inner"]}>
                        <h1>{props.post.title}</h1>
                        <span><FontAwesomeIcon
                            icon={faClock}/>{DateTime.fromISO(props.post.date).toFormat("DDD")}</span>
                        <p>{props.post.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostCard

