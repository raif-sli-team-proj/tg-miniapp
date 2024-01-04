import React from "react";

import DownIcon from "../svg/DownIcon";
import OkIcon from "../svg/OkIcon";
import ProblemsIcon from "../svg/ProblemsIcon";
import { ServiceStatus } from "../services/Service";

export default function ServiceStatusIcon({status}) {
    const size = {
        width: "40px",
        height: "40px",
    };

    if (status === ServiceStatus.Up) {
        return <OkIcon {...size} />;
    } else if (status === ServiceStatus.Problems) {
        return <ProblemsIcon {...size} />;
    } else {
        return <DownIcon {...size} />;
    }
}