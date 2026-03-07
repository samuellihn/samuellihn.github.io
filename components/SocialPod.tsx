import styles from "../styles/components/SocialPod.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { useRef, useState } from "react";

const SocialPod: (props: {
    icon: IconProp,
    name: string,
    href: string,
    hoverIcon?: IconProp
}) => JSX.Element = (props) => {
    const [hover, setHover] = useState(false);
    const labelRef = useRef<HTMLDivElement>(null)

    const hoverIn = () => {
        setHover(true)

        if (labelRef.current == undefined) return
        if (getComputedStyle(labelRef.current).transitionProperty == "none") {
            return
        }

        let width = labelRef.current.scrollWidth

        labelRef.current.style.width = width + 'px';


    }

    const hoverOut = () => {
        setHover(false)
        if (labelRef.current == undefined) return
        if (getComputedStyle(labelRef.current).transition == "none") {
            return
        }

        let width = labelRef.current.scrollWidth

        let transition = labelRef.current.style.transition
        labelRef.current.style.transition = ''

        requestAnimationFrame(() => {
            if (!labelRef.current) return;
            labelRef.current.style.width = width + 'px'
            labelRef.current.style.transition = transition

            requestAnimationFrame(function () {
                if (!labelRef.current) return;
                labelRef.current.style.width = '0px'
            });
        });
    }

    return (
        <Link href={props.href} className={styles["outer"]}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            target="_blank">
            <div className={styles["inner"]}>
                {props.hoverIcon ?
                    hover ?
                        <FontAwesomeIcon icon={props.hoverIcon} />
                        :
                        <FontAwesomeIcon icon={props.icon} />
                    :
                    <FontAwesomeIcon icon={props.icon} />
                }
            </div>
            <div className={styles["label"]} ref={labelRef}>
                <span>
                    {props.name}
                </span>
            </div>
        </Link>
    )
}
export default SocialPod
