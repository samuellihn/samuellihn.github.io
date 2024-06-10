import styles from "../styles/components/Education.module.sass"

const Education = (props: { inst: string, major: string, dates: string, location: string }) => {
    return (
        <div className={styles["education"]}>
            <span>
                <h3>{props.dates}</h3>
                <h3 className={styles["sep"]}>◇</h3>
                <h3>{props.location}</h3>
            </span>
            <h1 className={styles["education-inst"]}>{props.inst}</h1>
            <h2>{props.major}</h2>
        </div>
    )
}

export default Education

