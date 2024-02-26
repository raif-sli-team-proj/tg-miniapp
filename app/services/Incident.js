import config from "../config";

export const IncidentStatus = {
    Fixed: 'Up',
    Investigating: '',
    REPORTED: 'Down'
};

export const IncidentStatusNames = {
    'REPORTED': "Зафиксирован",
    'INVESTIGATING': "Расследуется",
    'RESOLVED': "Исправлен"
};

export default class IncidentInfo {
    incidentId;         // integer
    serviceId;          // string
    dateTime;           // Date
    status;             // string

    serviceFullName;    // string
    duration;           // duration in minutes
    statusName;         // String
    name;               // String

    constructor(incidentDto) {
        this.incidentId = incidentDto.incidentId;
        this.serviceId = incidentDto.serviceName;
        this.dateTime = new Date(incidentDto.incidentStartTime);
        this.status = incidentDto.incidentStatus;

        this.serviceFullName = config.services[config.serviceNames.indexOf(this.serviceId)];

        const incidentEndTime = incidentDto.incidentEndTime ?? new Date();
        this.duration = Math.round((incidentEndTime - this.dateTime) / 1000 / 60);
        this.statusName = IncidentStatusNames[incidentDto.incidentStatus];
        this.name = "Сервис недоступен";
    }
}