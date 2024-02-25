import React from "react";

import LeftArrowIcon from "../svg/LeftArrowIcon";

export default function ButtonBack({goBack, className}) {
    return (
        <div className={className} onClick={goBack}>
            <LeftArrowIcon/>
        </div>
    );
}
