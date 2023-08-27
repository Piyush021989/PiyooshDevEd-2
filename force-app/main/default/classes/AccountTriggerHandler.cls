public class AccountTriggerHandler {
    
    public static void CreateAccounts(List<Account> listOfAcc){
        for(Account a:listOfAcc){
            if(a.ShippingState  != a.BillingState ){
                a.ShippingState = a.BillingState;
            }
        }
    }
}