import React from "react";

import IncidentsHistory from "../components/IncidentsHistory.jsx";
import Header from "../components/Header.jsx";

export default function ServiceScreen({service, onReturn}) {
    return (
        <>
            <Header screenName={service.name} goBack={onReturn}/>
            <div className="Main">
                <IncidentsHistory serviceName={service.name} />
            </div>
        </>
    );
}
