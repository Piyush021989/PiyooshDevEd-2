trigger ClosedOpportunityTrigger on Opportunity (after insert, after Update) {
    
    list<Task> TasklisttoInsert = new list<Task>();
    
    for (Opportunity opp : [Select Id, Name from Opportunity where StageName = 'Closed Won']) {
        
         TasklisttoInsert.add(new Task(whatId = opp.Id,
                                       Subject = 'Follow Up Test Task'));

    }
    
    if (TasklisttoInsert.size() > 0) {
        
        insert TasklisttoInsert;
    }

}