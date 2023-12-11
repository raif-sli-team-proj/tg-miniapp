import React from "react";

function Incident({incident}) {
    return <li>{'Incident #' + incident}</li>;
}

function IncidentsHistory({incidents}) {
    return <ul>{incidents.map(item => <Incident key={item} incident={item}/>)}</ul>;
}

export function App() {
    const incidents = [1, 2, 3]
    return <IncidentsHistory incidents={incidents}/>;
}