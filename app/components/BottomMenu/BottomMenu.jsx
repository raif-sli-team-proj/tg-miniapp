import React from "react";
import useStyle from "./style";

export default function BottomMenu({children, className, selectedIndex, onSelect}) {
    const styles = useStyle();
    return (
        <div className={styles.BootomMenu + ' ' + className}>
            {children.map((child, index) => <div className={selectedIndex === index ? "selected-item" : ""} key={index} onClick={() => onSelect(index)}>{child}</div>)}
        </div>
    )
}
