import React, {useState} from "react";

import ServiceInfo from "./services/Service";
import ServiceScreen from "./screens/ServiceScreen";
import ServicesListScreen from "./screens/ServicesListScreen/ServicesListScreen";
import { ThemeProvider } from "react-jss";


export function MiniApp() {
    const [screen, selectScreen] = useState({
        name: "ServicesListScreen",
        props: null
    });

    const routes = {
        "ServicesListScreen": ServicesListScreen,
        "ServiceScreen": ServiceScreen,
    };

    const goToServiceScreen = serviceName => {
        const srv = new ServiceInfo(serviceName);
        selectScreen({name: "ServiceScreen", props: {service: srv}});
    }

    const goToServiceListScreen = () => {
        selectScreen({name: "ServicesListScreen", props: null});
    };

    const theme = {}

    return (
        <ThemeProvider theme={theme}>
            {screen.name === "ServicesListScreen" && <ServicesListScreen {...screen.props} onSelectService={goToServiceScreen} />}
            {screen.name === "ServiceScreen" && <ServiceScreen {...screen.props} onReturn={goToServiceListScreen}/>}
        </ThemeProvider>
    )
}
