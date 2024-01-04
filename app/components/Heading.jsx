import React from "react";

export default function Heading({children}) {
    const style = {
        fontSize: "28px",
        fontWeight: "700",
    };
    return (
        <div className="no-margin" style={style}>
            {children}
        </div>
    );
}
