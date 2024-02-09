import React, { useState } from "react";

import Column from "../Column";
import { Heading2 } from "../Headings";
import Row from "../Row";
import ServiceStatusIcon from "../ServiceStatusIcon";
import useStyles from "./style";

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
            <Row>
                <Column>
                    <Heading2>{service.name}</Heading2>
                    {service.sli != null && <div>SLI<span>95</span>: {service.sli}</div>}
                    {service.lastIncident && <div className="no-incidents">0 дней без инцидентов</div>}
                </Column>
                <ServiceStatusIcon status={service.status}/>
            </Row>
        </div>
    );
}
