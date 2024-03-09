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
            // paddingLeft: "6em",
        },

        "@media (min-height: 0px)": {
            "& .xticks": {
                // paddingLeft: "6em",
            },
        },

        "@media (min-height: 670px)": {
            "& .xticks": {
                // paddingLeft: "4em",
            },
        },

        "@media (min-height: 1000px)": {
            "& .xticks": {
            },
        },

        "@media (min-height: 1500px)": {
            "& .xticks": {
                // paddingLeft: "2em",
            },
        },

        "@media (min-height: 2100px)": {
            "& .xticks": {
            },
        },
    },
    TimeFrameSelector: {
        "display": "flex",
        "flexDirection": "row",
        "flex": "1 0 auto",
        // borderRadius: "0.5em",
        // borderLeftStyle: "solid",
        // borderRightStyle: "solid",
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
        "@media (min-height: 0px)": {
            "& .option": {
                fontSize: "14px",
            },
        },

        "@media (min-height: 670px)": {
            "& .option": {
                fontSize: "20px",
            },
        },

        "@media (min-height: 1000px)": {
            "& .option": {
                fontSize: "28px",
                borderWidth: "2px",
            },
        },

        "@media (min-height: 1500px)": {
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