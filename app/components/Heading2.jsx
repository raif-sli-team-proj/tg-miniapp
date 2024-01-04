import React from "react";

export default function Heading2({children}) {
    const style = {
        fontSize: "22px",
        fontWeight: "600",
    };
    return (
        <div className="no-margin" style={style}>
            {children}
        </div>
    );
}
