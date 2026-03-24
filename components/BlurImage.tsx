import styles from "../styles/components/BlurImage.module.sass";


const BlurImage: (props: { src: string, maxHeight?: string, alt?: string, onClick?: () => void }) => JSX.Element = (props) => {
    return (
        <div className={styles["gallery-image"]}
            onClick={props.onClick}
            style={
                props.maxHeight ? {
                    maxHeight: props.maxHeight,
                    aspectRatio: "unset",
                    backgroundImage: `url(${props.src})`,
                    cursor: props.onClick ? "pointer" : "default"
                } :
                    { backgroundImage: `url(${props.src})`, cursor: props.onClick ? "pointer" : "default" }}>

            <div className={styles["blur"]} >
                <img src={props.src} alt={props.alt} />
            </div>
        </div>
    )
}
export default BlurImage
