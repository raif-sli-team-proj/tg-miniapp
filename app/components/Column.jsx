import React from "react";

export default function Column({children, className}) {
    const style = {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "start",
        flexDirection: "column"
    };
    className = className ?? "";
    return (
        <div className={"no-margin " + className} style={style}>
            {children}
        </div>
    );
}
