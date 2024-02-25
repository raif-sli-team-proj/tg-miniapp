import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    ServiceScreen: {
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "& >div": {
            flex: "0 0 content",
        },
        "& .scrolable-content": {
            flex: "1 0 auto",
            position: "relative",
            overflow: "scroll",
            "& >div": {
                position: "absolute",
            }
        },
    }
});

export default useStyles;