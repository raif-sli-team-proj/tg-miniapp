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
    if (myServiceStatuses == null) {  // null or undefined
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
                sli: serviceStatus.sli ?? 99.95,
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

export async function retrieveSli(serviceName, timeFrame) {
    return new Promise(async (resolve) => {
        // const request_url = config.api_gateway_url_base + `/api/v1/sli/hardcode?frame=${timeFrame}`;
        // const response = await fetch(request_url);
        // if (!response.ok) {
        //     const result = {
        //         serviceName,
        //         error: {
        //             time: new Date().valueOf(),
        //         }
        //     }
        //     resolve(result);
        //     return;
        // }
        // const rspJson = await response.json();
        const rspJson = retrieveFakeSliData(timeFrame);
        rspJson.serviceName = serviceName;
        resolve(rspJson);
    });
}

function retrieveFakeSliData(frameSize) {
    return {
        frameSize,
        metrics: [
            { value: 0.9875, dateTime: "2024-02-01T00:00:00.000" },
            { value: 0.9879, dateTime: "2024-02-02T00:00:00.000" },
            { value: 0.988, dateTime: "2024-02-03T00:00:00.000" },
            { value: 0.9884, dateTime: "2024-02-04T00:00:00.000" },
            { value: 0.9881, dateTime: "2024-02-05T00:00:00.000" },
            { value: 0.9887, dateTime: "2024-02-06T00:00:00.000" },
            { value: 0.989, dateTime: "2024-02-07T00:00:00.000" },
            { value: 0.9894, dateTime: "2024-02-08T00:00:00.000" },
            { value: 0.9895, dateTime: "2024-02-09T00:00:00.000" },
            { value: 0.99, dateTime: "2024-02-10T00:00:00.000" },
            { value: 0.99, dateTime: "2024-02-11T00:00:00.000" },
            { value: 0.989, dateTime: "2024-02-12T00:00:00.000" },
            { value: 0.9895, dateTime: "2024-02-13T00:00:00.000" },
        ]
    }
}

export async function updateNotificationSettings(settings) {
    const request_url = config.api_gateway_url_base + '/api/v1/subscribe';
    let rsp = await fetch(request_url, {
        body: settings,
        method: "POST"
    });
    if (!rsp.ok) {
        console.error("Updating notification settings failed: " + rsp.status);
        return false;
    }
    return true;
}

export async function retrieveNotificationSettings() {
    const request_url = config.api_gateway_url_base = '/api/v1/subscribe';
    let rsp = await fetch(request_url);
    if (!rsp.ok) {
        console.error("Failed to fetch current notification settings: " + rsp.status);
        return {};
    }
    try {
        let settings = await rsp.json();
        return { settings };
    } catch(error) {
        console.error(error);
        return { error };
    }
}