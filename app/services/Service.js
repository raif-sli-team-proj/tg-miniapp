import config from "../config";

export const ServiceStatus = {
    Up: 'ON',
    Problems: 'DEGRADED',
    Down: 'OFF',
};

export default class ServiceInfo {
    name;  // String
    sli;  // float
    status;  // ServiceStatus
    lastIncident;  // { date, description, status }
    constructor(name, sli, status, lastIncident) {
        this.name = name;
        this.sli = sli;
        this.status = status;
        this.lastIncident = lastIncident;
    };

    static fromJson(obj) {
        const status = obj.currentStatus?.status ?? ServiceStatus.Down;
        const lastIncident = {
            date: obj.currentStatus?.eventDate,
            description: "",
            status: ServiceStatus.Down,
        };
        return new ServiceInfo(obj.serviceName, obj.sli, status, lastIncident);
    }
}

export function serviceNameToServiceId(serviceName) {
    return config.serviceNames[config.services.indexOf(serviceName)];
}
