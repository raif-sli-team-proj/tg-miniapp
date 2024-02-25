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
                    {service.lastIncident && <ShortText><span className="no-incidents">0 дней без инцидентов</span></ShortText>}
                </Column>
                <ServiceStatusIcon status={service.status}/>
            </Row>
        </div>
    );
}
