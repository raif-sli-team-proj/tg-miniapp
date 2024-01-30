import React from "react";

import Service from "../components/Service";
import ServiceInfo from "../services/Service";
import Header from "../components/Header";

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
        <>
            <Header screenName={"Сервисы RaifPay"}/>
            <div className="Main">
                {services.map(item => <Service key={item.name} service={item} onServiceClick={handleServiceClick}/>)}
            </div>
        </>
    );
}
