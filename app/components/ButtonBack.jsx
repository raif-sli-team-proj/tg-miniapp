import React from "react";

import LeftArrowIcon from "../svg/LeftArrowIcon";

export default function ButtonBack({goBack}) {
    const size = {
        width: "50px",
        height: "50px",
    };
    return (
        <div onClick={goBack}>
            <LeftArrowIcon {...size}/>
        </div>
    );
}
