import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    Heading1: {
        fontWeight: 700,


        "@media (max-width: 399px)": {
            fontSize: "20px",
        },

        "@media (min-width: 400px) and (max-width: 649px)": {
            fontSize: "28px"
        },

        "@media (min-width: 650px) and (max-width: 999px)": {
            fontSize: "40px"
        },
        "@media (min-width: 1000px)": {
            fontSize: "60px"
        }
    },
    Heading2: {
        fontWeight: 600,

        "@media (max-width: 399px)": {
            fontSize: "18px",
        },

        "@media (min-width: 400px) and (max-width: 649px)": {
            fontSize: "25px"
        },

        "@media (min-width: 650px) and (max-width: 999px)": {
            fontSize: "32px"
        },
        "@media (min-width: 1000px)": {
            fontSize: "50px"
        }
    }
});

export default useStyle;