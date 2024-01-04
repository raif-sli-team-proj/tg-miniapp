import React from "react";

import Heading from "../components/Heading";
import Service from "../components/Service";
import ServiceInfo from "../services/Service";

export default function ServicesListScreen({onSelectService}) {

    const services = [
        new ServiceInfo("Регистрация QR"),
        new ServiceInfo("Информация о мерчанте"),
        new ServiceInfo("Информация о платеже"),
        new ServiceInfo("Внесение ДС"),
        new ServiceInfo("Управление чеками"),
    ];
    const handleServiceClick = (serviceName) => {
        onSelectService(serviceName);
    };
    return (
        <div className="m-left-5 m-right-5">
            <Heading>Сервисы RaifPay</Heading>
            <hr />
            {services.map(item => <Service key={item.name} service={item} onServiceClick={handleServiceClick}/>)}
        </div>
    );
}
