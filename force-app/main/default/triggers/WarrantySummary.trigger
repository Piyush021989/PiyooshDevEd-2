trigger WarrantySummary on Case (before Insert) {
   for (Case MyCase: Trigger.new){
       string PurchaseDate            = MyCase.Product_Purchase_Date__c.format();
       string CreatedDate             = DateTime.now().format();
       Integer WarrantyDays           = MyCase.Product_Total_Warranty_Days__c.intvalue();
       Decimal WarrantyPercentage     = (100 * (MyCase.Product_Purchase_Date__c.daysBetween(Date.Today())/MyCase.Product_Total_Warranty_Days__c)).setscale(2) ;
       Boolean HasExtendedWarranty    = Mycase.Product_Has_Extended_Warranty__c; 
       String EndingStatement         = 'Have a Nice Day !';      
       MyCase.Warranty_Summary__c  =  'Product Purchase on ' + PurchaseDate  + ' '                
                                   + 'and Case Created on ' + CreatedDate + '.\n'
                                   + 'Warranty is for ' + WarrantyDays  + ' '
                                   + 'days and is ' + WarrantyPercentage + ' % through its warranty period.\n'
                                   + 'Extended Warranty: ' + HasExtendedWarranty + '.\n'
                                   + EndingStatement;
      }
}