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
            alignItems: "stretch",
            flex: "1 0 200px",
            display: "flex",
            overflow: "scroll",
            flexDirection: "column",
        },
    }
});

export default useStyles;