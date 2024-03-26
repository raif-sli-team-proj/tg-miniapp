import React, { useState } from "react";

import Column from "../Column";
import { Heading2 } from "../Headings";
import Row from "../Row";
import ServiceStatusIcon from "../ServiceStatusIcon";
import useStyles from "./style";
import ShortText from "../ShortText"

/**
 * service is instance of ServiceInfo
 */
export default function ServiceQuickInfoCard({service, onServiceClick, className}) {
    const styles = useStyles();

    const handleClick = (e) => {
        e.stopPropagation();
        onServiceClick(service.name);
    };

    return (
        <div className={className + " " + styles.ServiceQuickInfoCard} onClick={handleClick}>
            <Row className="row">
                <Column>
                    <Heading2>{service.name}</Heading2>
                    {service.sli != null && <ShortText className="sli">SLI<span>95</span>: {service.sli}</ShortText>}
                    {/* {service.lastIncident && <ShortText><span className="no-incidents">{getTextForDaysWithoutIncidents(service)}</span></ShortText>} */}
                </Column>
                <ServiceStatusIcon status={service.status}/>
            </Row>
        </div>
    );
}

function getTextForDaysWithoutIncidents(service) {
    const dayDurationInMillis = 1000 * 60 * 60 * 24;
    const nowTimestamp = Date.now();
    const incidentTimestamp = new Date(service.lastIncident.date).valueOf();
    let diffInMillis = nowTimestamp - incidentTimestamp - dayDurationInMillis;
    if (diffInMillis < 0) {
        console.warn("Last incident date is greater than today's date");
        diffInMillis = 0;
    }
    const daysNumber = Math.ceil(diffInMillis / (dayDurationInMillis));

    if (daysNumber % 100 != 11 && daysNumber % 10 == 1) {
        return `${daysNumber} день без инцидентов`;
    }
    if (daysNumber % 100 > 10 && daysNumber % 100 < 20)
        return `${daysNumber} дней без инцидентов`;
    if (daysNumber % 10 > 1 && daysNumber % 10 < 5) {
        return `${daysNumber} дня без инцидентов`;
    }
    return `${daysNumber} дней без инцидентов`;
}