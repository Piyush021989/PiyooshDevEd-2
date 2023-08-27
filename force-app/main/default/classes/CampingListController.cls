public class CampingListController {

    @AuraEnabled
    public static List<Camping_Item__c> getItems (){
        return [Select Name,Quantity__C,Packed__C,Price__c from Camping_Item__c];
    }
    
    @auraenabled
    public static Camping_Item__c saveItem (Camping_Item__c CampingItem){
        insert campingItem;
        return campingItem;
    }
}