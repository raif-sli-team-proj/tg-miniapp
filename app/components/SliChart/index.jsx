import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiRequestStatus } from "../../services/slicesBase";
import { retrieveSli } from "../../services/api";
import { TimeFrames, getAvailableSliMetrics, getError, getRequestStatus, sliFetched, sliRequested } from "../../services/sliSlice";
import TimeFrameSelector from "./TimeFrameSelector";

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
import useStyles from "./style";
import ShortText from "../ShortText";
import { Heading2 } from "../Headings";

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
    console.log("Rendering SliChart for " + serviceName);
    const sli = useSelector((state) => state.sli);  // sli is {apiRequestStatus, items}
    const dispatch = useDispatch();
    const styles = useStyles();
    const [viewHeight, setViewHeight] = useState(getCurrentViewHeight());
    useLayoutEffect(() => {
        const updateViewHeight = () => {
            setViewHeight(getCurrentViewHeight());
        };
        window.addEventListener('resize', updateViewHeight);
        updateViewHeight();
        return () => window.removeEventListener('resize', updateViewHeight);
    });
    const timeFrame = sli.selectedTimeFrame;

    if (needFecthNewData(sli, serviceName, timeFrame)) {
        dispatch(sliRequested({serviceName, frameSize: timeFrame}));
        retrieveSli(serviceName, timeFrame).then(
            value => dispatch(sliFetched(value))
        );
    }
    const sliItems = getAvailableSliMetrics(sli, serviceName, timeFrame);

    if (sliItems == null || sliItems.length == 0) {
        return <ShortText>{"Не удалось получить данные об истории изменения SLI"}</ShortText>
    }

    const labels = sliItems.map((item) => new Date(item.dateTime));
    const data = {
        labels: labels,
        datasets: [{
            label: "SLI",
            borderColor: "rgb(50, 100, 255)",
            backgroundColor: "rgb(50, 100, 255)",
            data: sliItems.map((item) => item.value * 100),
        }]
    }

    const chartFont = {
        family: "Roboto",
        size: viewHeight * 0.015,
    };
    return (
        <div className={styles.SliChart}>
            <Heading2 className="text-center">График SLI</Heading2>
            <Line
                data={data}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                font: chartFont,
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: false,
                            },
                        },
                        y: {
                            ticks: {
                                display: true,
                                callback: function(val, index) {
                                    return this.getLabelForValue(val) + '%';
                                },
                                font: chartFont,
                            }
                        }
                    }
                }}
            />
            <div className="xticks">
                <ShortText>{labels[0].toLocaleString()}</ShortText>
                <ShortText>{labels[labels.length - 1].toLocaleString()}</ShortText>
            </div>
            <Heading2 className="text-center">{"Интервал расчета SLI"}</Heading2>
            <TimeFrameSelector className="time-frame-selector"/>
        </div>
    )
}

function needFecthNewData(sliState, serviceName, timeFrame) {
    const FIVE_SECONDS = 5000;
    const reqStatus = getRequestStatus(sliState, serviceName, timeFrame);
    const error = getError(sliState, serviceName, timeFrame);
    if (reqStatus === ApiRequestStatus.Initial)  // there is no data at all
        return true;
    if (reqStatus === ApiRequestStatus.Done && error != null) {  // previous request failed
        return sliState.error.time + FIVE_SECONDS < (new Date()).valueOf();
    }
    return false;
}

function getCurrentViewHeight() {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}