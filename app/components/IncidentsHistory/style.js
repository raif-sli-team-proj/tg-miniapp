import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
    incidentsHistory: {
        paddingTop: "16px",
    },
    IncidentCard: {
        border: "2px solid",
        borderColor: "rgba(200, 200, 200, 0.3)",
        borderRadius: "10px",
        margin: "1% 0",
        padding: "1%",
        display: "flex",
        flexDirection: "column",
        "&.status-FIXED": {
            boxShadow: "2px 2px 5px rgb(94, 209, 182)",
        },
        "&.status-REPORTED": {
            boxShadow: "2px 2px 5px rgb(252, 150, 150)",
        },
        "&.status-INVESTIGATING": {
            boxShadow: "2px 2px 5px rgb(252, 182, 100)",
        }
    },
}));

export default useStyles;