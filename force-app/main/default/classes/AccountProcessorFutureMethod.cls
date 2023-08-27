public class AccountProcessorFutureMethod {
@future
    Public Static Void countContacts(set<Id> setid){
        
        List<Account> listAccount = [Select Id, Number_of_Contacts__c, (Select Id from Contacts) From Account where Id in :setid];
        
        For(Account acc:listAccount){
            
            List<Contact> ListContact = acc.contacts;
            acc.Number_of_Contacts__c = ListContact.size();
        }
        
        Update listAccount;
        
    }
}