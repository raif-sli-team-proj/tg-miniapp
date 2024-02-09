import config from "../config.js";
import Incident, { IncidentStatus } from "./Incident.js";
import ServiceInfo, { ServiceStatus } from "./Service.js"

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

export async function retrieveLastIncident(serviceName) {
    return await new Promise(async function(resolve) {
        await new Promise(r => setTimeout(r, 2000));
        resolve(new Incident(serviceName, new Date(2024, 0, 1), 10, ServiceStatus.Down, "Hardcoded"));
    });
}

async function retrieveStatuses() {
    const request_url = config.api_gateway_url_base + '/api/v1/status';

    const response = await fetch(request_url);
    return await response.json();
}

export function retreiveSli(serviceName, resolve) {
    setTimeout(() => {
        resolve({serviceName, sli: 99.95});
    }, 2000);
}

export async function retrieveServicesStatuses(services) {
    return new Promise(async (resolve) => {
        const allServiceStatuses = await retrieveStatuses();
        const result = [];
        for (let serviceStatus of allServiceStatuses) {
            // Array `services` has small chances to become larger than 20 elements, so linear search is fast enough or even faster then anything else here.
            if (undefined === services.find((it) => it === serviceStatus.serviceName))
                continue;

            const srv = {
                name: serviceStatus.serviceName,
                sli:serviceStatus.sli ?? 99.95,
                status: ServiceStatus.Problems,
                lastIncident: {
                    date: "2024-01-01T013:00:00.00+00:00",
                    description: "",
                    status: "FIXED"
                }
            };
            result.push(srv);
        }
        resolve(result);
    });
}