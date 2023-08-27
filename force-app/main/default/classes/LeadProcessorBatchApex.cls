global class LeadProcessorBatchApex implements Database.Batchable<sObject> , Database.Stateful{

    // instance member to retain state across transactions
       global Integer recordsProcessed = 0;

    //Start method
    Global Database.QueryLocator Start(Database.BatchableContext bc){
       String SOQL_Query = 'Select Id, LeadSource From Lead';
       return Database.getQueryLocator(SOQL_Query);    
    }
    //Execute Method
    Global void Execute(Database.BatchableContext bc, List<Lead> scope){
        for(Lead L:Scope){
            L.LeadSource = 'Dreamforce';
            // increment the instance member counter
              recordsProcessed = recordsProcessed + 1;
        } 
        Update scope;
    }
    //END Method
    global void finish(Database.BatchableContext bc){
        Id job= bc.getJobId();
        System.debug(job);
        System.debug(recordsProcessed + ' records processed. Yipeeeeee!');

    }
}