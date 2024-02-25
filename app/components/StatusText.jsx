import React from "react";

import { IncidentStatus } from "../services/Incident"
import ShortText from "./ShortText";

const statusToText = {
    [IncidentStatus.Fixed]: "исправлено",
    [IncidentStatus.Investigating]: "расследуется",
}

export default function StatusText({status}) {
    return (
        <ShortText>{"Статус: " + statusToText[status]}</ShortText>
        // <div className="m-top-1 m-bot-1">
        //     <Row>Статус:<div className="m-left-1">{statusToText[status]}</div></Row>
        // </div>
    )
}
