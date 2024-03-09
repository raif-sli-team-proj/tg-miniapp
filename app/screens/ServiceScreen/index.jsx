import React, {useState} from "react";

import IncidentsHistory from "../../components/IncidentsHistory";
import Header from "../../components/Header";
import BottomMenu from "../../components/BottomMenu/BottomMenu.jsx";
import useStyles from "./style.js";
import IncidentIcon512 from "../../svg/IncidentIcon512.jsx";
import SettingsIcon512 from "../../svg/SettingsIcon512.jsx";
import NotificationsSettings from "../Notifications/NotificationsSettings.jsx";
import SliChart from "../../components/SliChart/index.jsx";
import SliChartIcon24 from "../../svg/SliChartIcon24.jsx";
import { serviceNameToServiceId } from "../../services/Service.js";

export default function ServiceScreen({service, onReturn}) {
    const styles = useStyles();
    const [viewIndex, setViewIndex] = useState(0);

    const views = [
        {component: <IncidentsHistory serviceName={service.name} />, icon: <IncidentIcon512 key={0}/>},
        {component: <NotificationsSettings serviceName={service.name}/>, icon: <SettingsIcon512 key={1}/>},
        {component: <SliChart serviceName={serviceNameToServiceId(service.name)}/>, icon: <SliChartIcon24 key={2}/>}
    ];

    return (
        <div className={styles.ServiceScreen}>
            <Header screenName={service.name} goBack={onReturn}/>
            <div className="screen-content scrolable-content scroll-invisible">
                {views[viewIndex].component}
            </div>
            <BottomMenu
                selectedIndex={viewIndex}
                onSelect={index => { if (index != viewIndex) setViewIndex(index); }}
            >
                {views.map((item) => item.icon)}
            </BottomMenu>
        </div>
    );
}
