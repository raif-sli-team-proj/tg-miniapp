import React from "react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    Header: {
        boxShadow: "0px -4px 10px",
        display: "flex",
        alignItems: "stretch",
        "& .go-back-btn": {
            maxHeight: "95%",
            minHeight: "95%",
            "& svg": {
                height: "100%"
            }
        },

        "@media (max-width: 399px)": {
            minHeight: "50px",
            "& .raif-icon, .go-back-btn": {
                width: "40px",
            },
        },

        "@media (min-width: 400px) and (max-width: 499px)": {
            minHeight: "65px",
            "& .raif-icon, .go-back-btn": {
                height: "60px",
            },
        },

        "@media (min-width: 500px) and (max-width: 649px)": {
            minHeight: "72px",
            "& .raif-icon, .go-back-btn": {
                height: "68px",
            }
        },

        "@media (min-width: 650px) and (max-width: 999px)": {
            minHeight: "90px",
            "& .raif-icon, .go-back-btn": {
                height: "82px",
            },
        },

        "@media (min-width: 1000px)": {
            minHeight: "150px",
            "& .raif-icon, .go-back-btn": {
                height: "140px",
            },
        },
    }
});

export default useStyle;