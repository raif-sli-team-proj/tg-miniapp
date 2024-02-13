import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    BootomMenu: {
        display: "flex",
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
        },
        "& :first-child": {
            borderLeftWidth: "0"
        },
        "& :last-child": {
            borderRightWidth: "0"
        },
        "& .selected-item": {
            backgroundColor: "#aaa",
        }
    }
});

export default useStyle;
