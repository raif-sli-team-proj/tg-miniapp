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
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

class RaifStatusBot extends TelegramLongPollingBot {
    public RaifStatusBot(String botToken) {
        super(botToken);
		tgBotToken = botToken;
    }

    @Override
    public void onUpdateReceived(Update update) {
        try {
            System.out.println("Processing update");

            String dstChat = null;
            if (update.hasMessage()) {
                System.out.println("Processing message");
                var msgIn = update.getMessage();
                dstChat = Long.toString(msgIn.getChatId());
                if (!msgIn.hasText()) {
                    sendError(dstChat, "Incomding message is empty");
                    System.out.println("Incoming message is empty");
                    return;
                }
                if (!msgIn.getText().equals("/reset")) {
                    System.out.println("received unknown method " + msgIn.getText());
                    sendError("Only /reset supported", dstChat);
                    return;
                }
                counter = 0;
            } else if (update.hasCallbackQuery()) {
                System.out.println("Processing callback");
                var query = update.getCallbackQuery();
                String data = update.getCallbackQuery().getData();
                if (data != BTN_DATA) {
                    sendError("button data mismatch", query.getChatInstance());
                    System.out.println("button data mismatch");
                    return;
                }
                counter++;
            }
            SendMessage messageToSend = new SendMessage();
            messageToSend.setText("Here is your button");

            messageToSend.setChatId(dstChat);
            var ikm = new InlineKeyboardMarkup();
            var ikb = new InlineKeyboardButton();
            ikb.setText("clickme(" + counter + ")");
            ikb.setCallbackData(BTN_DATA);
            var row = new ArrayList<InlineKeyboardButton>();
            List<List<InlineKeyboardButton>> rows = new ArrayList<List<InlineKeyboardButton>>();
            row.add(ikb);
            rows.add(row);
            ikm.setKeyboard(rows);
            messageToSend.setReplyMarkup(ikm);

            System.out.println("Sending new button");
            execute(messageToSend);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
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

    private int counter = 0;
    private static final String BTN_DATA = "btn_data";
	private final String tgBotToken;
}
