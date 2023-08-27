trigger OrderEventTrigger on Order_Event__e (after insert) {
   List<Task> createTask = new List<Task>();
    
    for(Order_Event__e event:Trigger.New){
        if(event.Has_Shipped__c == true){
           Task TaskObj= new Task();
           TaskObj.Priority = 'Medium';
            TaskObj.Subject = 'Follow up on shipped order ' + event.Order_Number__c;
            TaskObj.OwnerId = event.CreatedById;
            createTask.add(TaskObj);
        }
    }
    
    if(!createTask.isEmpty()){
        Insert createTask;
    }
}