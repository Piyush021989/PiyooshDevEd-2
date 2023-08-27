trigger AccountAddressTrigger on Account (before insert,before Update) {
    
    for (Account acct: Trigger.new){
        
        if (acct.Match_Billing_Address__c == true){
            
            acct.ShippingPostalCode = acct.BillingPostalCode;
            
        }
        
    }

}