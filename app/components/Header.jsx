import React from "react"

import ButtonBack from "./ButtonBack"
import { Heading1 } from "./Headings";
import Row from "./Row";
import RaiffeisenIcon from "../svg/RaiffeisenIcon";

export default function Header({screenName, goBack}) {
    return (
        <div className="header">
            <Row className="h-100">
                { goBack != undefined && <ButtonBack goBack={goBack}/>}
                <div className="m-left-1"><RaiffeisenIcon height="32px" width="32px"></RaiffeisenIcon></div>
                <div className="m-left-1"><Heading1>{screenName}</Heading1></div>
            </Row>
        </div>
    );
}
