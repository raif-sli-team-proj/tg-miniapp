import React from "react";
import useStyle from "./style.js";

export function Heading1({children}) {
    const style = useStyle();
    return (
        <div className={"no-margin " + style.Heading1} style={style}>
            {children}
        </div>
    );
}

export function Heading2({children, className}) {
    const style = useStyle();
    return (
        <div className={(className ?? "") + " no-margin " + style.Heading2} style={style}>
            {children}
        </div>
    );
}
