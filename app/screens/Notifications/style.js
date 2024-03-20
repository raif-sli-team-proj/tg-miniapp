import { createUseStyles } from "react-jss";

const style = createUseStyles({
    Checkbox: {
        "@media (min-width: 1000px)": {
            width: "45px",
            height: "45px",
        },
        "@media (min-width: 650px) and (max-width: 999px)": {
            width: "30px",
            height: "30px",
        },
        "@media (min-width: 400px) and (max-width: 649px)": {
            width: "20px",
            height: "20px",
        },
        "@media (max-width: 399px)": {
            width: "15px",
            height: "15px",
        }
    }
});

export default style;