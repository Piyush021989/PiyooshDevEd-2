trigger OpportunityChangeTrigger on OpportunityChangeEvent (after insert) {
    List<Task> tasks = new List<Task>();
    // Iterate through each event message.
    for (OpportunityChangeEvent event : Trigger.New) {
        // Get some event header fields
        EventBus.ChangeEventHeader header = event.ChangeEventHeader;
        System.debug('Received change event for ' +
                     header.entityName +
                     ' for the ' + header.changeType + ' operation.');
        // For update operations, we can get a list of changed fields
        if (header.changetype == 'UPDATE' &&  event.IsWon == true) {
            System.debug('List of all changed fields:');
            for (String field : header.changedFields) {
                if (null == event.get(field)) {
                    System.debug('Deleted field value (set to null): ' + field);
                } else {
                    System.debug('Changed field value: ' + field + '. New Value: '
                                 + event.get(field));
                }
                
                // Create a followup task
                Task tk = new Task();
                tk.Subject = 'Follow up on won opportunities: ' + header.recordIds;
                tk.OwnerId = header.CommitUser;
                tasks.add(tk);
            }
        }
        
    }
    // Insert all tasks in bulk.
    if (tasks.size() > 0) {
        insert tasks;
    }
    
}