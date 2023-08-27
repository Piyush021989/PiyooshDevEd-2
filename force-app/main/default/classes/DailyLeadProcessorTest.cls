@isTest
public class DailyLeadProcessorTest {
    public static String CRON_EXP = '0 0 0 15 3 ? 2022';
    static testmethod void testScheduledJob() {
        
        List<Lead> lds = new List<Lead>();
        for (Integer i=0; i<200; i++){
            Lead l = new Lead( FirstName = 'Lead ' + i,LastName='LastName'+i,Company ='demo'+i);
            lds.add(l);
        }
        insert lds;
        
        Map<Id, Lead> ledMap = new Map<Id, Lead>(lds);
        List<Id> ledIds = new List<Id>(ledMap.keySet());
        Test.startTest();
        String jobId = System.schedule('ScheduledApexTest',CRON_EXP, new DailyLeadProcessor());
        List<Lead> lt = [SELECT Id from Lead where LeadSource = null and id in :ledIds];
        System.assertEquals(200,lt.size(),'all there');
        Test.stopTest();
        lt = [SELECT Id from Lead where LeadSource = null and id in :ledIds];
        System.assertEquals(0,lt.size(),'all done');
    }
    
}