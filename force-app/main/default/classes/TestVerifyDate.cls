@isTest
public class TestVerifyDate {
    @isTest static void testCheckDate(){
        date d1=VerifyDate.CheckDates(system.today(),system.today().addDays(10));
        System.assertEquals(system.today().addDays(10),d1);
        
        date d2=VerifyDate.CheckDates(system.today(),system.today().addDays(78));
        System.assertEquals(system.today(),d2);
    }
}