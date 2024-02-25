import React from "react";

import DownIcon from "../svg/DownIcon";
import OkIcon from "../svg/OkIcon";
import ProblemsIcon from "../svg/ProblemsIcon";
import { ServiceStatus } from "../services/Service";

export default function ServiceStatusIcon({status}) {
    if (status === ServiceStatus.Up) {
        return <OkIcon />;
    } else if (status === ServiceStatus.Problems) {
        return <ProblemsIcon />;
    } else {
        return <DownIcon />;
    }
}