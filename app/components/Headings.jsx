import React from "react";

export function Heading1({children}) {
    const style = {
        fontSize: "20px",
        fontWeight: "700",
        // lineHeight: "1.1em"
    };
    return (
        <div className="no-margin" style={style}>
            {children}
        </div>
    );
}

export function Heading2({children}) {
    const style = {
        fontSize: "16px",
        fontWeight: "600",
        // lineHeight: "1.1em"
    };
    return (
        <div className="no-margin" style={style}>
            {children}
        </div>
    );
}
