import { MDXRemote } from "next-mdx-remote";
import { getProjects, Project } from "../../lib/contentFetcher";
import styles from "../../styles/ProjectPage.module.sass"
import BlurImage from "../../components/BlurImage";
import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

export async function getStaticPaths() {
    let projects: Project[] = await getProjects()

    let paths: { params: { project: string } }[] = []
    projects.forEach(
        (p) => paths.push({
            params: { project: p.slug }
        })
    )

    return {
        paths: paths, fallback: false
    };
}

export async function getStaticProps({ params }: { params: { project: string } }) {
    let project = (await getProjects()).find((p) => p.slug === params.project)
    return {
        props: { project }
    }
}

const ProjectPage = ({ project }: { project: Project }) => {
    const router = useRouter()
    const [modalIndex, setModalIndex] = useState<number | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);

    const closeModal = useCallback(() => {
        setModalIndex(null)
        setIsZoomed(false)
    }, []);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (project.images && modalIndex !== null) {
            setModalIndex((modalIndex + 1) % project.images.length);
            setIsZoomed(false);
        }
    }, [modalIndex, project.images]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (project.images && modalIndex !== null) {
            setModalIndex((modalIndex - 1 + project.images.length) % project.images.length);
            setIsZoomed(false);
        }
    }, [modalIndex, project.images]);

    const toggleZoom = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsZoomed(prev => !prev);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (modalIndex === null) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalIndex, closeModal, nextImage, prevImage]);


    useEffect(() => {
        const handlePopState = () => router.push('/')
        window.addEventListener("popstate", handlePopState)
        return () => window.removeEventListener("popstate", handlePopState)
    }, [router]);

    return (
        <div className={styles["page"]}>
            <Head>
                <title>{`${project.title} | Projects`}</title>
            </Head>

            {modalIndex !== null && project.images && (
                <div className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalClose} onClick={closeModal}>×</div>
                    <div className={styles.modalContent}>
                        <button className={styles.navButton} onClick={prevImage} aria-label="Previous Image">{"<<"}</button>
                        <div
                            className={`${styles.modalImageContainer} ${isZoomed ? styles.zoomed : ''}`}
                            onClick={toggleZoom}
                        >
                            <img
                                src={project.images[modalIndex]}
                                alt={`Gallery image ${modalIndex + 1}`}
                                className={styles.modalImage}
                            />
                        </div>
                        <button className={styles.navButton} onClick={nextImage} aria-label="Next Image">{">>"}</button>
                    </div>
                </div>
            )}

            <div className={styles["page-inner"]}>
                <button
                    className={styles.backButton}
                    onClick={() => router.push('/')}
                    aria-label="Back to Home"
                >
                    {"<<"} Home
                </button>
                <h1>{project.title}</h1>
                <div className={styles["split"]}>
                    <div className={styles["main"]}>
                        <h3>{project.description}</h3>
                        <div className={styles["content"]}>
                            <MDXRemote {...project.content} />
                        </div>
                    </div>
                    <div className={styles["side"]}>
                        <BlurImage src={project.thumbnail ?? ""} maxHeight={"60ex"} />
                    </div>
                </div>
                {
                    (project.images?.length ?? 0 > 0) ?
                        <div>
                            <h2>Gallery</h2>
                            <div className={styles["gallery"]}>
                                {
                                    project.images?.map((imgSrc, idx) => (
                                        <BlurImage
                                            src={imgSrc}
                                            key={imgSrc}
                                            onClick={() => setModalIndex(idx)}
                                        />
                                    ))
                                }
                            </div>
                        </div> : <div />
                }
            </div>
        </div>
    )
}

export default ProjectPage