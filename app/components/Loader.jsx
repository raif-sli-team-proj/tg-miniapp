import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loader() {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Oval
                height={vh * 0.5}
                width={vw * 0.5}
                color="#FEE600"
                secondaryColor="#ccc"
                ariaLabel="Processing request"
            />
        </div>
    );
}