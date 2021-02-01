import React, {CSSProperties, MouseEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconLookup} from '@fortawesome/fontawesome-svg-core'
import styles from './style.module.css';



interface iProp {
    icon: IconLookup ,
    onClick(e: MouseEvent<HTMLButtonElement>): any,
    className?: string
    title?: string,
    style?: CSSProperties
}

const BtnIcon: React.FC<iProp> = ({icon, onClick, className, title, style}) => (
    <button
        onClick={onClick}
        className={className && styles.hasOwnProperty(className) ? styles[className] +' '+ styles.btn : styles.btn}
        title={title}
        style={style}
    >
        <FontAwesomeIcon icon={icon} />
    </button>
)

export default BtnIcon;