import React from "react";

export default function Date({date}) {
    return (
        <div>Дата: {date.toLocaleDateString()}</div>
    );
}