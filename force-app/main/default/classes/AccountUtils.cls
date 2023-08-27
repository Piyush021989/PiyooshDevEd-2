public class AccountUtils {

    public static List<Account> accountsByState(string getState){
        return [Select Id,Name from Account Where BillingState  = :getState];
    }
}