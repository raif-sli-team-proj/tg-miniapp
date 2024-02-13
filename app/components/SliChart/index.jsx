import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiRequestStatus } from "../../services/slicesBase";
import { retrieveSli } from "../../services/api";
import { sliFetched, sliRequested } from "../../services/sliSlice";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

export default function SliChart({serviceName}) {
    const sli = useSelector((state) => state.sli);  // sli is {apiRequestStatus, items}
    const dispatch = useDispatch();

    // FIXME: timeFrame must be configured
    const timeFrame = "10m";

    if (needFecthNewData(sli)) {
        dispatch(sliRequested());
        retrieveSli(serviceName, timeFrame).then(value => dispatch(sliFetched(value)));
    }
    const sliItems = sli.items[serviceName][timeFrame];

    console.log(sliItems);

    if (sliItems == null || sliItems.length == 0) {
        return <div>No data to display</div>
    }

    // const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const labels = sliItems.map((item, index) => item.dateTime);
    console.log(labels);

    const data = {
        // labels: sliItems.map((item, index) => {index}),
        labels: labels,
        datasets: [{
            label: "SLI",
            borderColor: "rgb(50, 100, 255)",
            backgroundColor: "rgb(50, 100, 255)",
            data: sliItems.map((item) => item.value * 100),
        }]
    }

    return (
        <Line
            data={data}
            options={{
                scales: {
                    x: {
                        ticks: {
                            callback: function(val, index) {
                                // Hide every 2nd tick label
                                return index % 4 === 3 ? this.getLabelForValue(val) : '';
                            },
                        },
                        // type: 'linear',
                        // autoSkip: false,
                        // count: 4
                    },
                    y: {
                        ticks: {
                            callback: function(val, index) {
                                return this.getLabelForValue(val) + '%';
                            }
                        }
                    }
                }
            }}
        />
    )
}

function needFecthNewData(sliState) {
    const FIVE_SECONDS = 5000;
    if (sliState.apiRequestStatus === ApiRequestStatus.Initial)  // there is no data at all
        return true;
    if (sliState.apiRequestStatus === ApiRequestStatus.Done && sliState.error != null) {  // there previous request failed
        return sliState.error.time + FIVE_SECONDS < (new Date()).valueOf();
    }
    return false;
}