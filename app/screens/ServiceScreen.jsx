import React from "react";

import ButtonBack from "../components/ButtonBack.jsx";
import Heading from "../components/Heading.jsx";
import IncidentsHistory from "../components/IncidentsHistory.jsx";
import Row from "../components/Row.jsx"

export default function ServiceScreen({service, onReturn}) {
    return (
        <div className="m-left-5 m-right-5">
            <Row>
                <ButtonBack goBack={onReturn} />
                <div className="m-left-2"><Heading>{service.name}</Heading></div>
            </Row>
            <hr />
            <IncidentsHistory serviceName={service.name} />
        </div>
    );
}
