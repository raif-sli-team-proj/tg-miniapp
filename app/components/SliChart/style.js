import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    SliChart: {
        alignItems: "stretch",
        display: "flex",
        flexDirection: "column",
        "& .xticks": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "rgb(0, 0, 0, 0.75)",
        },
    },
    TimeFrameSelector: {
        "display": "flex",
        "flexDirection": "row",
        "flex": "1 0 auto",
        "& >div": {
            "flex": "1 1 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "2em",
            borderLeftStyle: "solid",
            borderWidth: "1px",
            borderColor: "#eee",
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
        },
        "& :first-child": {
            borderTopLeftRadius: "0.5em",
            borderBottomLeftRadius: "0.5em",
        },
        "& :last-child": {
            borderTopRightRadius: "0.5em",
            borderBottomRightRadius: "0.5em",
            borderRightStyle: "solid",
        },
        "& .selected": {
            backgroundColor: "#aaa",
        },

        "@media (max-height: 669px)": {
            "& .option": {
                fontSize: "14px",
            },
        },

        "@media (min-height: 670px) and (max-height: 999px)": {
            "& .option": {
                fontSize: "20px",
            },
        },

        "@media (min-height: 1000px) and (max-height: 1499px)": {
            "& .option": {
                fontSize: "28px",
                borderWidth: "2px",
            },
        },

        "@media (min-height: 1500px) and (max-height: 2199px)": {
            "& .option": {
                fontSize: "38px",
            },
        },

        "@media (min-height: 2100px)": {
            "& .option": {
                fontSize: "44px",
                borderWidth: "3px",
            },
        },
    },
});

export default useStyles;