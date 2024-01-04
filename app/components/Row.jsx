import React from "react";

export default function Row({children}) {
    const style = {
        display: "flex",
        justifyContent: "start",
        width: "100%",
        alignItems: "center"
    };
    return (
        <div className="no-margin" style={style}>
            {children}
        </div>
    );
}
