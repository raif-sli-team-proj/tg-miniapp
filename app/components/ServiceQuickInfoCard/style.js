import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    ServiceQuickInfoCard: {
        "& span": {
            display: "inline-block",
            height: 0,
            lineHeight: 1,
            fontSize: "10px",
            position: "relative",
            bottom: "-0.2em",
        },
        "& .no-incidents": {
            color: "#333",
            fontSize: "12px",
        }
    }
});

export default useStyles;