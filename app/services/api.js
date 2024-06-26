import config from "../config.js";
import Incident from "./Incident.js";
import { ServiceStatus } from "./Service.js"

// FIXME: serviceName must be service id (i.e. "QRC" instead of "Регистарция QR" and also must not be unused parameter)
export async function retrieveIncidents(serviceName, pageNumber = 0) {
    const request_url = config.api_gateway_url_base + `/api/v1/incident/${pageNumber}/${config.incidents_page_size}`;
    const response = await fetch(request_url);
    if (!response.ok) {
        const result = {
            error: `Failed to fetch incidents page#${pageNumber}, status_code=${response.status_code}`
        };
        return result;
    }
    const result = {
        incidents: await response.json()
    };
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

export async function retrieveServicesStatuses(services) {
    return new Promise(async (resolve) => {
        const allServiceStatuses = await retrieveStatuses();
        const result = [];
        for (let serviceStatus of allServiceStatuses) {
            // Array `services` has small chances to become larger than 20 elements, so linear search is fast enough or even faster then anything else here.
            if (undefined === services.find((it) => it === serviceStatus.serviceName))
                continue;
            result.push(serviceStatus);
        }
        resolve(result);
    });
}

export async function retrieveSli(serviceName, timeFrame) {
    const request_url = config.api_gateway_url_base + `/api/v1/sli/${serviceName}?frame=${timeFrame}`;
    return new Promise(async (resolve) => {
        const response = await fetch(request_url);
        if (!response.ok) {
            const result = {
                serviceName,
                frameSize: timeFrame,
                error: `Failed to retrieve sli of ${serviceName}, status_code=${response.status_code}`
            }
            resolve(result);
            return;
        }

        let rspJson = {};
        try {
            rspJson = await response.json();
        } catch (e) {
            const result = {
                serviceName,
                frameSize: timeFrame,
                error: "Unexpected error during parsing sli response body: " + e
            };
            resolve(result);
            return;
        }

        rspJson.serviceName = serviceName;
        rspJson.frameSize = timeFrame;
        resolve(rspJson);
    });
}

/*
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
*/

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
    const request_url = config.api_gateway_url_base + '/api/v1/subscribe';
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

export async function retrieveComments(serviceId, incidentId) {
    const request_url = config.api_gateway_url_base + `/api/v1/comment/${incidentId}`;
    let rsp = await fetch(request_url);
    if (!rsp.ok) {
        const result = {
            serviceId,
            incidentId,
            error: `Fetch comment for incident ${serviceId}#${incidentId} failed, status_code=${rsp.status_code}`
        };
        return result;
    }
    try {
        return {
            serviceId,
            incidentId,
            comments: await rsp.json()
        };
    } catch (error) {
        console.error(error);
        return { serviceName, incidentId, error };
    }
}

export async function addNewComment(userName, text, incidentId, newIncidentStatus) {
    const request_url = config.api_gateway_url_base + '/api/v1/comment';
    const response = await fetch(request_url, {
        body: JSON.stringify({
            userId: userName,
            contents: text,
            incidentId,
            newIncidentStatus
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        console.error("Failed to add new comment");
        return false;
    }
    return true;
}

// username and telegramChatId
export async function subscribeToNotifications(chatId) {
    const request_url = config.api_gateway_url_base + '/api/v1/subscription';
    const requestBody = {
        "telegramChatId": chatId
    };

    const response = await fetch(request_url, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        console.error("Failed to subscribe");
        return {
            error: "Subscribe failed. HTTP status code: " + response.status,
        };
    }
    return {
        [chatId]: true
    };
}

export async function unsubscribeToNotifications(chatId) {
    const request_url = config.api_gateway_url_base + '/api/v1/subscription';
    const requestBody = {
        "telegramChatId": chatId
    };

    const response = await fetch(request_url, {
        method: "DELETE",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        console.error("Failed to unsubscribe");
        return {
            error: "Unsubscribe failed. HTTP status code: " + response.status,
        };
    }
    return {
        [chatId]: false
    };
}

export async function checkSubscribed(chatId) {
    const request_url = config.api_gateway_url_base + `/api/v1/subscription/${chatId}`;
    const response = await fetch(request_url);
    if (!response.ok) {
        console.error(`Failed to check is chat ${chatId} subscribed for notifications`);
        return {
            error: "Check subscription failed. HTTP status code: " + response.status,
        };
    }
    return {
        [chatId]: (await response.json())["isSubscribed"],
    };
}

export async function checkIsAdmin(username) {
    const request_url = config.api_gateway_url_base + `/api/v1/admin/check/${username}`;
    const response = await fetch(request_url);
    if (!response.ok) {
        return {
            result: null,
            error: "Failed to check for my admin permissions, status_code=" + response.status,
        };
    }
    return {
        result: await response.json(),
    };
}
