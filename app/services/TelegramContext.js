export function getCurrentUsername() {
    if (window.Telegram == null)
        return "asminimulin";
    return window.Telegram.WebApp.initDataUnsafe.user.username;
}

export function getCurrentChatId() {
    if (window.Telegram == null)
        return "123";

    return window.Telegram.WebApp.initDataUnsafe.start_param ?? null;
}
