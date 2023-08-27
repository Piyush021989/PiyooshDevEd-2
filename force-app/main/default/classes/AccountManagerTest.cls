@isTest
Private class AccountManagerTest {
    Static testmethod void testmethod1(){
        
        Account objAccount = new Account(Name ='Test Account');
        Insert objAccount;
        System.debug('Account Inserted Successfully ==>' + objAccount.Id + '=====>'+ objAccount.Name);
        
        Contact objContact = new Contact(LastName ='Test Contact', AccountId = objAccount.Id);
        Insert objContact;
        System.debug('Contact Inserted Successfully ==>' + objContact.Id +'====>' + objContact.LastName );
        
        Id recordId = objAccount.Id;
        
        system.debug('accountID will be ==>' + recordId );
        RestRequest request = new RestRequest();
        request.requestURI = 'https://piyoosh-dev-ed.lightning.force.com/services/apexrest/Accounts/' + recordId +'/contacts';
        request.httpMethod = 'GET';
        
        RestContext.request = request;
        
        Account thisAccount = AccountManager.getAccount();
        system.debug('Name of the thisAccount ==> '+ thisAccount);
        
        System.assert(thisAccount != null);
        system.assertEquals('Test Account',thisAccount.Name);
        
       }
}