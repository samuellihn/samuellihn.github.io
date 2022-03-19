import type {NextPage} from 'next'

import {promises as fs} from "fs"
import Head from 'next/head'
import Image from 'next/image'
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"
import {serialize} from "next-mdx-remote/serialize"
import styles from '../styles/Home.module.sass'
import FloatingNav from "../components/FloatingNav";
import path from "path";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faGithubSquare
} from '@fortawesome/free-brands-svg-icons'
import {
    faEnvelope,
    faMapLocationDot
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const options = {
    mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: []
    },
};

type HomeContent = {
    bio: MDXRemoteSerializeResult

}


export async function getStaticProps() {
    const contentPath: string = path.join(process.cwd(), "website/home")
    const mdBio = await fs.readFile(path.join(contentPath, "bio.mdx"))
    const bio = await serialize(mdBio.toString(), options)

    let content: HomeContent = {
        bio,
    }

    return {
        props: content
    }
}

const Home: NextPage = ({bio}: any) => (
    <div className={styles["main-page"]}>
        <Head>
            <title>Samuel Lihn | Home</title>
        </Head>
        <div className={styles["title-screen"]}>
            <div className={styles.title}>
                <h1>Samuel Lihn</h1>
                <h2>Student, Application Developer, Robotics Enthusiast</h2>
                <hr/>
                <FloatingNav/>
            </div>
        </div>

        <section id={"about"} className={`${styles.section} ${styles.about}`}>
            <div className={styles["section-inner"]}>
                <h1>About Me</h1>
                <div className={styles["about-container"]}>
                    <div className={styles.summary}>
                        <MDXRemote {...bio}/>
                    </div>
                    <div className={styles.accounts}>
                        <Link href={"https://github.com/samuellihn"}>
                            <span><FontAwesomeIcon icon={faGithubSquare}/>samuellihn</span>
                        </Link>
                        <Link href={"mailto: samuellihn@gmail.com"}>
                            <span><FontAwesomeIcon icon={faEnvelope}/>samuellihn@gmail.com</span>
                        </Link>

                        <span><FontAwesomeIcon icon={faMapLocationDot}/>Piscataway, NJ</span>
                    </div>
                </div>
            </div>
        </section>
        {/*<section id={"Projects"} className={`${styles.section} ${styles.projects}`}>*/}
        {/*    <div className={styles["section-inner"]}>*/}

        {/*        <h1>Projects</h1>*/}


        {/*    </div>*/}

        {/*</section>*/}
    </div>
);

export default Home
