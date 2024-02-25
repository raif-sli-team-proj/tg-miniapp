import React from "react";
import { Heading1, Heading2 } from "../../components/Headings";
import { useSelector } from "react-redux";

export default function NotificationsSettings({}) {
    useSelector(state => state.notificationSettings)
    const settings = {
        personal: {
            enabled: true
        },
        group: {
            enabled: true
        }
    };
    return (
        <div>
        {/* <div className="Main scroll-invisible"> */}
            <Heading1>Настройки оповещений</Heading1>
            <form id="personal-settings">
                <Heading2>Личные сообщения</Heading2>
                <label>
                    <input
                        type="checkbox"
                        value={settings.personal.enabled}
                        name="enabled"
                        onInput={() => submitForm("personal-settings")}
                    />
                    Оповещать через личные сообщения
                </label>
            </form>
            {settings.group.enabled && <form id="group-settings">
                <Heading2>Групповой чат</Heading2>
                <label>
                    <input
                        type="checkbox"
                        value={settings.group.enabled}
                        name="enabled"
                        onInput={() => submitForm("group-settings")}
                    />
                    Оповещать в данном групповом чате
                </label>
            </form>}
            {/*<p>
                Can write to pm: {window.Telegram.WebApp.initDataUnsafe.user.allows_write_to_pm ? "yes" : "no"}
            </p>
            <p>
                Username: {window.Telegram.WebApp.initDataUnsafe.user.username}
            </p>
            <p>
                User: {JSON.stringify(window.Telegram.WebApp.initDataUnsafe.user)}
            </p>*/}
        {/* </div> */}
        </div>
    );
}

function getFormDataAsJson(formId) {
    const form = document.getElementById(formId);
    const inputs = form.getElementsByTagName("input");
    const res = {};
    for (var input of inputs) {
        res[input.name] = (input.value === "true");
    }
    return res;
}

function submitForm(formId) {
    const formData = getFormDataAsJson();
    console.log(formData);
}