import React, { useState } from "react";

import Column from "./Column";
import Heading2 from "./Heading2";
import Row from "./Row";
import { ServiceStatus } from "../services/Service";
import ServiceStatusIcon from "./ServiceStatusIcon";
import { retriveCurrentStatus } from "../services/IncidentsHistory";

export default function Service({service, onServiceClick}) {
    const [currentStatus, setCurrentStatus] = useState(null);
    if (currentStatus === null) {
        retriveCurrentStatus(service.name).then((status) => {
            setCurrentStatus(status);
        });
    }
    const handleClick = (e) => {
        e.stopPropagation();
        onServiceClick(service.name);
    };
    return (
        <div onClick={handleClick}>
            <Row>
                <Column>
                    <Heading2>{service.name}</Heading2>
                    <div>SLA: 99.99%</div>
                    <div>Крайний инцидент: 01.01.2024</div>
                </Column>
                <ServiceStatusIcon status={currentStatus || ServiceStatus.Down}/>
            </Row>
        </div>
    );
}
