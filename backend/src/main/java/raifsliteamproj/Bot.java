package raifsliteamproj;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.EditMessageText;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.api.objects.CallbackQuery;
import org.telegram.telegrambots.meta.api.objects.Update;

import java.util.ArrayList;
import java.util.List;

import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppInfo;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

class RaifStatusBot extends TelegramLongPollingBot {
    public RaifStatusBot(String botToken, String miniAppUrl) {
        super(botToken);
		tgBotToken = botToken;
        this.miniAppUrl = miniAppUrl;
    }

    @Override
    public void onUpdateReceived(Update update) {
        try {
            System.out.println("Processing update");

            if (update.hasMessage()) {
                System.out.println("Processing message");
                var msgIn = update.getMessage();
                if (!msgIn.hasText()) {
                    sendError("Incoming message is empty", msgIn.getChatId());
                    System.out.println("Incoming message is empty");
                    return;
                }
                if (!msgIn.getText().equals("/start")) {
                    System.out.println("received unknown method " + msgIn.getText());
                    sendError("Only /start supported", msgIn.getChatId());
                    return;
                }
                sendStartMiniAppButton(msgIn.getChatId());
            }
        } catch (TelegramApiException e) {
            e.printStackTrace(System.out);
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
    }

    @Override
    public String getBotUsername() {
        return "raif_status_bot";
    }

    @Override
    public String getBotToken() {
        return tgBotToken;
    }

    private void sendError(String text, long chatId) throws TelegramApiException {
        var msg = new SendMessage(Long.toString(chatId), text);
        execute(msg);
    }

    private void sendError(String text, String chatInstance) throws TelegramApiException {
        var msg = new SendMessage(chatInstance, text);
        execute(msg);
    }

    private void sendStartMiniAppButton(long chatId) {
        var miniAppInfo = new WebAppInfo(this.miniAppUrl);
        var inlineButton = new InlineKeyboardButton("Open Mini App");
        inlineButton.setWebApp(miniAppInfo);

        List<List<InlineKeyboardButton>> keyboard = new ArrayList<>(1);
        keyboard.add(new ArrayList<>());
        keyboard.getFirst().add(inlineButton);

        var message = new SendMessage();
        message.setChatId(chatId);
        message.setText("Go!");
        message.setReplyMarkup(new InlineKeyboardMarkup(keyboard));

        try {
            execute(message);
        } catch (TelegramApiException e) {
            System.out.println("Failed to send start mini app button");
            e.printStackTrace(System.out);
        }
    }

	private final String tgBotToken;
    private final String miniAppUrl;
}
