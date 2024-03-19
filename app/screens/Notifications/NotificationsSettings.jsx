import React from "react";
import { Heading1, Heading2 } from "../../components/Headings";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscribed, subscribeToNotifications, unsubscribeToNotifications } from "../../services/api";
import { getCurrentChatId, getCurrentUserId, getCurrentUsername } from "../../services/TelegramContext";
import { hasRequestInProgress, isChatIdSubscribed, notificationSettingsRetreiveRequested, notificationSettingsRetreived, notificationSettingsUpdateRequested, notificationSettingsUpdated } from "../../services/notificationsSettingsSlice";
import Loader from "../../components/Loader";

export default function NotificationsSettings({}) {
    const state = useSelector(state => state.notificationSettings);
    const dispatch = useDispatch();
    const openedFromGroupChat = getCurrentChatId() != null;

    if (hasRequestInProgress(state)) {
        return Loader();
    }

    if (isChatIdSubscribed(state, getCurrentUserId()) == null) {
        dispatch(notificationSettingsRetreiveRequested());
        checkSubscribed(getCurrentUserId()).then(payload => dispatch(notificationSettingsRetreived(payload)));
        return Loader();
    }

    if (openedFromGroupChat && isChatIdSubscribed(state, getCurrentChatId()) == null) {
        dispatch(notificationSettingsRetreiveRequested());
        checkSubscribed(getCurrentChatId()).then(payload => dispatch(notificationSettingsRetreived(payload)));
        return Loader();
    }

    return (
        <div>
            <Heading1>Настройки оповещений</Heading1>
            <form>
                <Heading2>Личные сообщения</Heading2>
                <label>
                    <input
                        type="checkbox"
                        checked={isChatIdSubscribed(state, getCurrentUserId())}
                        name="enable-personal-notification"
                        onChange={(e) => submitForm(e.target.checked, getCurrentUserId(), dispatch)}
                    />
                    Оповещать через личные сообщения
                </label>
            </form>
            {openedFromGroupChat && <form>
                <Heading2>Групповой чат</Heading2>
                <label>
                    <input
                        type="checkbox"
                        checked={isChatIdSubscribed(state, getCurrentChatId())}
                        name="enable-group-notification"
                        onChange={(e) => submitForm(e.target.checked, getCurrentChatId(), dispatch)}
                    />
                    {`Оповещать в данном групповом чате.`}
                </label>
            </form>}
        </div>
    );
}

function submitForm(subscribe, chatId, dispatch) {
    dispatch(notificationSettingsUpdateRequested());
    let result = null;
    if (subscribe)
        result = subscribeToNotifications(chatId)
    else
        result = unsubscribeToNotifications(chatId);
    result.then(payload => {
        dispatch(notificationSettingsUpdated(payload));
    });
}