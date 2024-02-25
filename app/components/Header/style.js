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

        "@media (min-height: 0px)": {
            minHeight: "50px",
            "& .raif-icon, .go-back-btn": {
                height: "46px",
            },
        },

        "@media (min-height: 670px)": {
            minHeight: "65px",
            "& .raif-icon, .go-back-btn": {
                height: "60px",
            },
        },

        "@media (min-height: 1000px)": {
            minHeight: "90px",
            "& .raif-icon, .go-back-btn": {
                height: "82px",
            },
        },

        "@media (min-height: 1500px)": {
            minHeight: "120px",
            "& .raif-icon, .go-back-btn": {
                height: "110px",
            },
        },

        "@media (min-height: 2100px)": {
            minHeight: "150px",
            "& .raif-icon, .go-back-btn": {
                height: "140px",
            },
        },
    }
});

export default useStyle;