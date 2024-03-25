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
        "&.status-RESOLVED": {
            boxShadow: "2px 2px 5px rgb(94, 209, 182)",
        },
        "&.status-REPORTED": {
            boxShadow: "2px 2px 5px rgb(252, 150, 150)",
        },
        "&.status-INVESTIGATING": {
            boxShadow: "2px 2px 5px rgb(252, 182, 100)",
        },
        "& .comment-input": {
            display: "flex",
            flexDirection:  "row",
            // alignItems: "end",
            marginTop: "0.5em",
            "& >input": {
                flex: "1 0 auto",
                borderRadius: "10px",
                boxShadow: "none",
                padding: "0 1%",
                minWidth: "100px",
            },
            "& >button": {
                backgroundColor: "transparent",
                border: "none",
                marginLeft: "3%",
                padding: 0,
            },
        },
        "& .select-new-status": {
            width: "10em",
            height: "2em",
            background: "transparent",
            border: "solid 1px",
            borderRadius: ".15em",
            boxShadow: "0 0.05em 0.1em #aaa",
            "& >option": {
                background: "transparent",
            }
        },


        "@media (max-width: 399px)": {
            "& .comment-input": {
                "& >input": {
                    fontSize: "12px",

                },
                "& >button": {
                    flex: "0 0 40px",
                },
            },
            "& .select-new-status": {
                fontSize: "14px",
            },
        },

        "@media (min-width: 400px) and (max-width: 649px)": {
            "& .comment-input": {
                "& >input": {
                    fontSize: "18px",

                },
                "& >button": {
                    flex: "0 0 55px",
                },
            },
            "& .select-new-status": {
                fontSize: "20px",
            },
        },

        "@media (min-width: 650px) and (max-width: 999px)": {
            "& .comment-input": {
                "& >input": {
                    fontSize: "24px",

                },
                "& >button": {
                    flex: "0 0 80px",
                },
            },
            "& .select-new-status": {
                fontSize: "28px",
            },
        },
        "@media (min-width: 1000px)": {
            "& .comment-input": {
                "& >input": {
                    fontSize: "38px",

                },
                "& >button": {
                    flex: "0 0 90px",
                },
            },
            "& .select-new-status": {
                fontSize: "42px",
            },
        },
    },
    Comment: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        "& .date-string": {
            fontWeight: "650",
        },
        "& .comment-header": {
            marginTop: "0.2em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& .color-RESOLVED": {
                color: "rgb(94, 209, 182)",
            },
            "& .color-REPORTED": {
                color: "rgb(252, 150, 150)",
            },
            "& .color-INVESTIGATING": {
                color: "rgb(252, 182, 100)",
            },
        }
    }
}));

export default useStyles;