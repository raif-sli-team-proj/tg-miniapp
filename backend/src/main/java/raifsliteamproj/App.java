package raifsliteamproj;

import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

public class App {
    public static void main( String[] args ) {
        String botToken = System.getenv("TG_BOT_TOKEN");
        if (botToken.isEmpty()) {
            System.err.println("TG_BOT_TOKEN environment variable is unset, cannot run bot");
            System.exit(1);
        }
        String miniAppUrl = System.getenv("MINIAPP_URL");
        if (miniAppUrl.isEmpty()) {
            System.err.println("MINIAPP_URL environment variable is unset, cannot run bot");
            System.exit(1);
        }
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(new RaifStatusBot(botToken, miniAppUrl));
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}
