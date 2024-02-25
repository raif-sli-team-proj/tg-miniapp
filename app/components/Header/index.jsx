import React from "react"

import { Heading1 } from "../Headings";
import Row from "../Row";
import RaiffeisenIcon from "../../svg/RaiffeisenIcon";
import LeftArrowIcon from "../../svg/LeftArrowIcon.jsx";
import useStyle from "./style.js";


export default function Header({screenName, goBack}) {
    const headerStyle = useStyle();
    return (
        <div className={headerStyle.Header}>
            <Row className="row">
                { goBack != undefined && <div className="go-back-btn" onClick={goBack}><LeftArrowIcon/></div>}
                <div className="m-left-1"><RaiffeisenIcon className="raif-icon"></RaiffeisenIcon></div>
                <div className="m-left-1"><Heading1>{screenName}</Heading1></div>
            </Row>
        </div>
    );
}
