import React from "react";

import ServiceQuickInfoCard from "../../components/ServiceQuickInfoCard/ServiceQuickInfoCard";
import Header from "../../components/Header";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { retrieveServicesStatuses } from "../../services/api";
import { statusesFetched, statusesRequested } from "../../services/statusesSlice";
import { ApiRequestStatus } from "../../services/slicesBase";
import useStyles from "./style";
import ServiceInfo from "../../services/Service";

export default function ServicesListScreen({onSelectService}) {
    const statuses = useSelector((state) => state.statuses);  // statuses is {apiRequestStatus, items}
    const dispatch = useDispatch();

    if (statuses.apiRequestStatus == ApiRequestStatus.Initial) {
        dispatch(statusesRequested());
        retrieveServicesStatuses(config.services).then(
            receivedStatuses => {
                dispatch(statusesFetched(receivedStatuses))
            }
        ).catch(
            e => console.error(`Failed to retrieve services statuses: ${e}`)
        )
    }

    const handleServiceClick = (serviceName) => {
        onSelectService(serviceName);
    };

    const styles = useStyles();

    return (
        <>
            <Header screenName={"Сервисы RaifPay"}/>
            <div className="Main">
                <div className={styles.ServicesListScreen}>
                    {config.services.map(srvName => statuses.items[srvName] && <ServiceQuickInfoCard className="service-card" key={srvName} service={ServiceInfo.fromJson(statuses.items[srvName])} onServiceClick={handleServiceClick}/>)}
                </div>
            </div>
        </>
    );
}
