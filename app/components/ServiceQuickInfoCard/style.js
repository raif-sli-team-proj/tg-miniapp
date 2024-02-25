import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    ServiceQuickInfoCard: {
        "& .sli": {
            "& span": {
                display: "inline-block",
                height: 0,
                lineHeight: 1,
                fontSize: "0.6em",
                position: "relative",
                bottom: "-0.2em",
            },
        },
        "& .no-incidents": {
            color: "#333",
            fontSize: "0.7em",
        },
        "& .row": {
            alignItems: "stretch",
        },
        "& svg": {
            maxHeight: "95%",
            maxWidth: "15%"
        }
    }
});

export default useStyles;