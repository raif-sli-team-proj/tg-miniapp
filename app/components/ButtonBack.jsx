import React from "react";

import LeftArrowIcon from "../svg/LeftArrowIcon";

export default function ButtonBack({goBack, className}) {
    const size = {
        width: "50px",
        height: "50px",
    };
    return (
        <div className={className} onClick={goBack}>
            <LeftArrowIcon {...size}/>
        </div>
    );
}
