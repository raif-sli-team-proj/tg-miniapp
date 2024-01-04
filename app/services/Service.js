export const ServiceStatus = {
    Up: 'Up',
    Problems: 'Problems',
    Down: 'Down',
};

export default class ServiceInfo {
    name;
    constructor(name) {
        this.name = name;
    }
}