import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    BootomMenu: {
        display: "flex",
        alignItems: "stretch",
        // boxSizing: "border-box",
        width: "100%",
        minHeight: "2em",
        boxShadow: "0px 4px 10px",
        "& >div": {
            margin: "0",
            flex: "1 1 auto",
            borderWidth: "0 1px",
            borderStyle: "solid",
            borderColor: "#eee",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "@media (min-height: 0px)": {
                height: "35px",
            },

            "@media (min-height: 670px)": {
                height: "48px"
            },

            "@media (min-height: 1000px)": {
                height: "77px"
            },

            "@media (min-height: 1500px)": {
                height: "100px",
            },

            "@media (min-height: 2100px)": {
                height: "125px",
            },
        },
        "& :first-child": {
            borderLeftWidth: "0"
        },
        "& :last-child": {
            borderRightWidth: "0"
        },
        "& .selected-item": {
            backgroundColor: "#aaa",
        },
        "& svg": {
            margin: "0 auto",
            height: "100%",
        },
    },
});

export default useStyle;
