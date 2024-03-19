import { createUseStyles } from "react-jss";

const style = createUseStyles({
    Checkbox: {
        "@media (min-width: 1100px)": {
            width: "50px",
            height: "50px",
        },
        "@media (min-width: 800px) and (max-width: 1099px)": {
            width: "40px",
            height: "40px",
        },
        "@media (min-width: 500px) and (max-width: 799px)": {
            width: "30px",
            height: "30px",
        },
        "@media (max-width: 499px)": {
            width: "20px",
            height: "20px",
        }
    }
});

export default style;