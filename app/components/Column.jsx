import React from "react";

export default function Column({children}) {
    const style = {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "start",
        flexDirection: "column"
    };
    return (
        <div className="no-margin" style={style}>
            {children}
        </div>
    );
}
