import React, {useState} from "react";

import ServiceInfo from "./services/Service";
import ServiceScreen from "./screens/ServiceScreen";
import ServicesListScreen from "./screens/ServicesListScreen";

export function MiniApp() {
    const [screen, selectScreen] = useState({
        name: "ServicesListScreen",
        props: null
    });

    const routes = {
        "ServicesListScreen": ServicesListScreen,
        "ServiceScreen": ServiceScreen,
    };

    if (screen.name === "ServicesListScreen") {
        const handleSelectService = (serviceName) => {
            const srv = new ServiceInfo(serviceName);
            selectScreen({name: "ServiceScreen", props: {service: srv}});
        };
        return <ServicesListScreen {...screen.props} onSelectService={handleSelectService}/>
    } else if (screen.name == "ServiceScreen") {
        const handleReturn = () => { selectScreen({name: "ServicesListScreen", props: null}); }
        return <ServiceScreen {...screen.props} onReturn={handleReturn}/>
    } else {
        <h1>Routing error {screen.name} is unknown screen.</h1>
    }
}
