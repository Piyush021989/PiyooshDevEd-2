@RestResource(UrlMapping='/Accounts/*/contacts')
global with Sharing class AccountManager {

    @HttpGet
    global static Account getAccount(){
        RestRequest request = RestContext.request;
        string accountId = request.requestURI.substringBetween('Accounts/','/contacts');
        system.debug('AccountId====>'+accountId );
        Account objAccount = [Select Id, Name, (Select Id, Name from Contacts) from Account where Id = :accountId Limit 1];
        return objAccount;
    }
}