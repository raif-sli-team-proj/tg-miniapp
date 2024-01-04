import config from "../config.js";
import Incident, { IncidentStatus } from "./Incident.js";
import { ServiceStatus } from "./Service.js"

// FIXME: serviceName must be service id (i.e. "QRC" instead of "Регистарция QR")
export async function retrieveIncidents(serviceName) {
    const servicesStatuses = await retrieveStatuses();
    const result = [];
    for (const serviceEvents of servicesStatuses) {
        if (serviceEvents.serviceName !== serviceName) {
            continue;
        }
        for (const event of serviceEvents.statuses.slice(-10)) {
            result.push(new Incident(serviceName, new Date(event.eventDate), 1, IncidentStatus.Fixed, event.status));
        }
    }
    result.reverse();
    return result;
}

export async function retriveCurrentStatus(serviceName) {
    const allServiceStatuses = await retrieveStatuses();
    const myServiceStatuses = allServiceStatuses.find(item => item.serviceName === serviceName);
    if (myServiceStatuses == null) {  // mull or undefined 
        return ServiceStatus.Down;
    }
    if (myServiceStatuses.statuses.length === 0) {
        return ServiceStatus.Down;
    }
    const currentDateTimeStr = new Date().toJSON();;
    const currentDateStr = currentDateTimeStr.slice(0, currentDateTimeStr.indexOf('T'))
    const lastStatus = myServiceStatuses.statuses.pop()
    if (lastStatus.eventDate === currentDateStr) {
        switch (lastStatus.status) {
            case "UP": return ServiceStatus.Up
            case "OFF": return ServiceStatus.Down
            case "DEGRADED": return ServiceStatus.Problems
        }
    }
    return ServiceStatus.Down;
}

async function retrieveStatuses() {
    const request_url = config.api_gateway_url_base + '/api/v1/status';

    const response = await fetch(request_url);
    return await response.json();
}