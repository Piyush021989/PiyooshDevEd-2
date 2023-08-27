public class AccountHandler {
    public static void insertAccount(integer value){
        integer numNewAcct = 0;
        List<Account> addAccounts =  new List<Account>();
        while(numNewAcct <= value){
            //display the current counter value
            System.debug('Counter Value before Incrementing ' + numNewAcct);
            //create a new account
            Account store = new Account();
            store.Name = 'Acme Inc ' + numNewAcct;
            store.AccountNumber = 'A000' + numNewAcct;
            addAccounts.add(store);
            System.debug(addAccounts);
            //increment the counter
            numNewAcct = numNewAcct + 1;
            System.debug('Counter Value after incrementing ' + numNewAcct);
        }
        insert addAccounts;
        System.debug('Get Data ==' + addAccounts[0].Id);
    }
}