import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    ShortText: {
        fontWeight: 500,

        "@media (min-height: 0px)": {
            fontSize: "14px"
        },

        "@media (min-height: 670px)": {
            fontSize: "22px"
        },

        "@media (min-height: 1000px)": {
            fontSize: "28px"
        },

        "@media (min-height: 1500px)": {
            fontSize: "32px"
        },

        "@media (min-height: 2100px)": {
            fontSize: "42px",
        },
    }
});

export default useStyles;