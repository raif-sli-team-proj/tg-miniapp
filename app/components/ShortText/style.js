import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    ShortText: {
        fontWeight: 500,

        "@media (max-width: 399px)": {
            fontSize: "14px",
        },

        "@media (min-width: 400px) and (max-width: 649px)": {
            fontSize: "20px"
        },

        "@media (min-width: 650px) and (max-width: 999px)": {
            fontSize: "28px"
        },
        "@media (min-width: 1000px)": {
            fontSize: "42px"
        }
    }
});

export default useStyles;