import React from "react";
import useStyle from "./style.js";

export default function ShortText({className, children}) {
    if (className == null)
        className = "";
    const styles = useStyle();
    return (<span className={styles.ShortText + " " + className}>{children}</span>)
}
