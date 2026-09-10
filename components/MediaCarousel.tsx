import { useState } from "react"
import { MediaItem } from "../lib/contentFetcher"
import styles from "../styles/components/MediaCarousel.module.sass"
import BlurImage from "./BlurImage"

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src)

const MediaCarousel = (props: { items: MediaItem[], maxHeight?: string }) => {
    const [index, setIndex] = useState(0)

    if (props.items.length === 0) return <div />

    const count = props.items.length
    const item = props.items[index % count]
    const step = (delta: number) => setIndex((index + delta + count) % count)

    return (
        <div className={styles["carousel"]}>
            {isVideo(item.src) ? (
                <video
                    key={item.src}
                    className={styles["video"]}
                    style={props.maxHeight ? { maxHeight: props.maxHeight } : undefined}
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                />
            ) : (
                <BlurImage src={item.src} maxHeight={props.maxHeight} alt={item.caption} />
            )}

            {item.caption ? <p className={styles["caption"]}>{item.caption}</p> : null}

            {count > 1 ? (
                <div className={styles["controls"]}>
                    <button onClick={() => step(-1)} aria-label="Previous item">{"<<"}</button>
                    <div className={styles["dots"]}>
                        {props.items.map((m, i) => (
                            <button
                                key={m.src}
                                className={i === index ? styles["active"] : undefined}
                                onClick={() => setIndex(i)}
                                aria-label={`Item ${i + 1} of ${count}`}
                            />
                        ))}
                    </div>
                    <button onClick={() => step(1)} aria-label="Next item">{">>"}</button>
                </div>
            ) : null}
        </div>
    )
}

export default MediaCarousel
