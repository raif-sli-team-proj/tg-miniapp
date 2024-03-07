import React from "react";
import { Heading1, Heading2 } from "../../components/Headings";
import { useSelector } from "react-redux";
import { subscribeToNotifications } from "../../services/api";
import { getCurrentChatId, getCurrentUsername } from "../../services/TelegramContext";

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
    const openedFromGroupChat = getCurrentChatId() != null;
    return (
        <div>
            <Heading1>Настройки оповещений</Heading1>
            <form id="personal-settings">
                <Heading2>Личные сообщения</Heading2>
                <label>
                    <input
                        type="checkbox"
                        value={settings.personal.enabled}
                        name="enable-personal-notification"
                        onInput={() => submitForm("personal-settings")}
                    />
                    Оповещать через личные сообщения
                </label>
            </form>
            {openedFromGroupChat && <form id="group-settings">
                <Heading2>Групповой чат</Heading2>
                <label>
                    <input
                        type="checkbox"
                        value={settings.group.enabled}
                        name="enable-group-notification"
                        onInput={() => submitForm("group-settings")}
                    />
                    {`Оповещать в данном групповом чате.`}
                </label>
            </form>}
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
    const formData = getFormDataAsJson(formId);
    console.log(formData);
    const notificationSettings = {};
    if (formData["enable-personal-notificaion"])
        notificationSettings["userId"] = getCurrentUsername();
    if (formData["enable-group-notification"])
        notificationSettings["telegramChatId"] = getCurrentChatId();
    subscribeToNotifications(notificationSettings);
}