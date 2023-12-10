package raifsliteamproj;

import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

public class App {
    public static void main( String[] args ) {
        System.out.println("Running main");
        String botToken = System.getenv("TG_BOT_TOKEN");
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(new RaifStatusBot(botToken));
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}
