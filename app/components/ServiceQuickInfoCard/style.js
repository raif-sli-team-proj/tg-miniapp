import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    ServiceQuickInfoCard: {
        padding: "1.5%",
        borderRadius: "10px",
        // border: "solid #ccc 1px",
        boxShadow: "0 0 5px 3px #ccc",
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