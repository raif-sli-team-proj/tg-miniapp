import React from "react";

export default function Row({children, className}) {
    className = className ?? "";

    const style = {
        "display": "flex",
        "justifyContent": "flex-start",
        "width": "100%",
        "alignItems": "center"
    };

    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}
