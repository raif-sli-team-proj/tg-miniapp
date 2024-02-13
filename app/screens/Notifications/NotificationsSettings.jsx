import React from "react";
import { Heading1 } from "../../components/Headings";

export default function NotificationsSettings({}) {
    return (
        <>
        <Heading1 screenName="Настройки оповещений" goBack={() => console.log("Trying to go back")} />
        <div className="Main scroll-invisible">
            Скоро здесь будут настройки оповещений
        </div>
        </>
    );
}
