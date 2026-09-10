import type { NextPage } from 'next'

import { promises as fs } from "fs"
import Head from 'next/head'
import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import styles from '../styles/Home.module.sass'
import FloatingNav from "../components/FloatingNav";
import path from "path";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub,
    faLinkedinIn
} from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { parseExperience, ExperienceEntry, getProjects, Project } from "../lib/contentFetcher";
import SocialPod from "../components/SocialPod";
import { useEffect, useRef, useState } from "react";
import Experience from '../components/Experience'
import Education from "../components/Education";
import ProjectCard from "../components/ProjectCard";


const options = {
    mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: []
    },
};

const SELECTED_WORK = ["satellitegpc", "nmpctraffic"]

type HomeContent = {
    blurb: MDXRemoteSerializeResult
    experience: ExperienceEntry[]
    projects: Project[]
}


export async function getStaticProps() {
    const contentPath: string = path.join(process.cwd(), "public", "home")

    const mdBlurb = await fs.readFile(path.join(contentPath, "blurb.md"))
    const blurb = await serialize(mdBlurb.toString(), options)

    const mdExperience = await fs.readFile(path.join(contentPath, "experience.md"))
    let experience = parseExperience(mdExperience)
    for (let i = 0; i < experience.length; i++) {
        experience[i].contentSerialized = await serialize(experience[i].content)
    }

    const projects = await getProjects()

    let content: HomeContent = {
        blurb,
        experience,
        projects,
    }
    return {
        props: content
    }
}


const Home: ({ blurb, experience, projects }: HomeContent) => JSX.Element = ({ blurb, experience, projects }: HomeContent) => {

    const aboutRef = useRef(null)
    const workRef = useRef(null)
    const experienceRef = useRef(null)
    const projectsRef = useRef(null)

    const [curSection, setCurSection] = useState("About")

    const selectedWork = SELECTED_WORK
        .map((slug: string) => projects.find((p: Project) => p.slug === slug))
        .filter((p): p is Project => p !== undefined)

    const sectionSet = (section: string, href: string) => {
        history.replaceState(null, "", location.origin + location.pathname + `#${href}`)
        setCurSection(section)
    }


    useEffect(() => {


        const aboutCallback = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                sectionSet("About", "about")
            }

        }
        const workCallback = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                sectionSet("Work", "work")
            }
        }
        const experienceCallback = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                sectionSet("Experience", "experience")
            }
        }
        const projectsCallback = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                sectionSet("Projects", "projects")
            }
        }

        const aboutObserver = new IntersectionObserver(
            aboutCallback, { root: null, rootMargin: "0px", threshold: 1 })
        if (aboutRef.current) aboutObserver.observe(aboutRef.current)

        const workObserver = new IntersectionObserver(
            workCallback, { root: null, rootMargin: "0px", threshold: 1 })
        if (workRef.current) workObserver.observe(workRef.current)

        const experienceObserver = new IntersectionObserver(
            experienceCallback, { root: null, rootMargin: "0px", threshold: 1 })
        if (experienceRef.current) experienceObserver.observe(experienceRef.current)

        const projectsObserver = new IntersectionObserver(
            projectsCallback, { root: null, rootMargin: "0px", threshold: 1 })
        if (projectsRef.current) projectsObserver.observe(projectsRef.current)

        return () => {
            aboutObserver.disconnect()
            workObserver.disconnect()
            experienceObserver.disconnect()
            projectsObserver.disconnect()
        }

    }, [aboutRef, workRef, experienceRef, projectsRef]);

    return (
        <div className={styles["main-page"]}>
            <Head>
                <title>Samuel Lihn | Home</title>
            </Head>
            <div className={styles["main-flex"]}>
                <div className={`${styles["left-pane"]} ${styles[curSection]}`}>
                    <div className={styles["title-bar"]}>
                        <h1>Samuel Lihn</h1>
                        <p className={styles["specialty"]}>Robotics · Learning · Control</p>
                        <p className={styles["affiliation"]}>Johns Hopkins · Robotics MSE · May 2027</p>
                        <div className={styles["quick-links"]}>
                            <Link href={"/resume.pdf"} target={"_blank"}>
                                <span>Résumé</span>
                                <span className={styles["arrow"]}>↗</span>
                            </Link>
                            <Link href={"mailto:slihn1@jh.edu"}>
                                <span>Email</span>
                                <span className={styles["arrow"]}>↗</span>
                            </Link>
                        </div>
                        <FloatingNav entries={[
                            { label: "About", href: "#about" },
                            { label: "Selected Work", href: "#work", section: "Work" },
                            { label: "Experience", href: "#experience" },
                            { label: "Projects", href: "#projects" },
                        ]} selected={curSection} />
                        <div className={styles["dynamic-panel-1"]}>
                            <h1>Education</h1>
                            <div className={styles["education"]}>
                                <Education inst={"Johns Hopkins University"}
                                    major={"MSE, Robotics"}
                                    dates={"2025 - 2027"}
                                    location={"Baltimore, MD"} />
                                <Education inst={"Johns Hopkins University"}
                                    major={"BS, Mechanical Engineering"}
                                    dates={"2023 - 2027"}
                                    location={"Baltimore, MD"} />
                                <Education inst={"Edison Academy Magnet School"}
                                    major={"Electrical & Computer Engineering Technologies"}
                                    dates={"2019 - 2023"}
                                    location={"Edison, NJ"} />
                            </div>
                        </div>
                        <div className={styles["social-container"]}>
                            <SocialPod icon={faLinkedinIn} name={"linkedin.com/in/samuellihn/"}
                                href={"https://www.linkedin.com/in/samuellihn/"} />
                            <SocialPod icon={faGithub} name={"github.com/samuellihn"}
                                href={"https://github.com/samuellihn"} />
                        </div>
                    </div>
                </div>
                <div className={styles["content"]}>
                    <section id={"about"} ref={aboutRef} className={styles["title-screen"]}>
                        <div className={styles['blurb']}>
                            <MDXRemote {...blurb} />
                        </div>

                    </section>
                    <section id={"work"} className={styles["selected-work"]}>
                        <h1 ref={workRef}>Selected Work</h1>
                        <div className={styles["projects-container"]}>
                            {selectedWork.map((p: Project) => (
                                <ProjectCard project={p} key={p.slug} />
                            ))}
                        </div>
                    </section>
                    <section id={"experience"} className={styles["experience"]}>
                        <h1 ref={experienceRef}>Experience</h1>
                        {experience.map((exp: ExperienceEntry) => (
                            <Experience exp={exp} key={exp.title} />
                        ))}
                    </section>
                    <section id={"projects"} className={styles["projects"]}>
                        <h1 ref={projectsRef}>Projects</h1>
                        <div className={styles["projects-container"]}>
                            {projects.map((p: Project) => (
                                <ProjectCard project={p} key={p.slug} />
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    )
};

export default Home
