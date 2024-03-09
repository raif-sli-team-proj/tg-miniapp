import React from "react";
import { selectedNewTimeFrame, TimeFrames, TimeFrameTranslations } from "../../services/sliSlice";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";

export default function TimeFrameSelector({className}) {
    const timeFrame = useSelector(state => state.sli.selectedTimeFrame);
    const dispatch = useDispatch();
    const styles = useStyles();
    const handleOnClick = (ev, timeFrame) => {
        ev.stopPropagation();
        dispatch(selectedNewTimeFrame(timeFrame));
    };
    className = className ?? "";
    return (
        <div className={styles.TimeFrameSelector + " " + className}>
            {TimeFrames.map(tf => <div key={tf} onClick={(e) => handleOnClick(e, tf)} className={timeFrame == tf ? "selected option" : "option"}>{TimeFrameTranslations[tf]}</div>)}
        </div>
    )
}