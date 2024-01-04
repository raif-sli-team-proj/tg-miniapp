import React from "react";

import { IncidentStatus } from "../services/Incident"
import Row from "./Row";

const statusToText = {
    [IncidentStatus.Fixed]: "исправлено",
    [IncidentStatus.Investigating]: "расследуется",
}

export default function StatusText({status}) {
    return (
        <div className="m-top-1 m-bot-1">
            <Row>Статус:<div className="m-left-1">{statusToText[status]}</div></Row>
        </div>
    )
}
