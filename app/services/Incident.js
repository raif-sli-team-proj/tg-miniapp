export const IncidentStatus = {
    Fixed: 'Up',
    Investigating: 'Problems',
    Broken: 'Down'
};

export default class Incident {
    service;
    date;
    duration;
    status;
    name;

    constructor(service, date, duration, status, name) {
        this.service = service;
        this.date = date;
        this.duration = duration;
        this.status = status;
        this.name = name;
    }
}