import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    Heading1: {
        fontWeight: 700,

        "@media (min-height: 0px)": {
            fontSize: "20px"
        },

        "@media (min-height: 670px)": {
            fontSize: "32px"
        },

        "@media (min-height: 1000px)": {
            fontSize: "40px"
        },

        "@media (min-height: 1500px)": {
            fontSize: "52px"
        },

        "@media (min-height: 2100px)": {
            fontSize: "70px",
        },
    },
    Heading2: {
        fontWeight: 600,

        "@media (min-height: 0px)": {
            fontSize: "18px",
        },

        "@media (min-height: 670px)": {
            fontSize: "28px"
        },

        "@media (min-height: 1000px)": {
            fontSize: "34px"
        },

        "@media (min-height: 1500px)": {
            fontSize: "44px",
        },

        "@media (min-height: 2100px)": {
            fontSize: "60px",
        },
    }
});

export default useStyle;