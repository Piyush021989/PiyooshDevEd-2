trigger SendConfirmationEmail on Session_Speaker__c (after insert) {
    
    List<id> SessionspeakerIds = new List<id>();
    
    For (Session_Speaker__c  newItem : Trigger.new){
        SessionspeakerIds.add(newItem.Id);
    }
    
    List<Session_Speaker__c> SessionSpeakers = [SELECT Session__r.Name,
                                                      Session__r.Session_Date__c,
                                                      Speaker__r.First_Name__c,
                                                      Speaker__r.Last_Name__c,
                                                      Speaker__r.Email__c
                                              FROM Session_Speaker__c
                                              WHERE Id IN :sessionSpeakerIds
                                              AND Speaker__r.Email__c <> NULL];
    
    if (SessionSpeakers.size() > 0){
        
        string[] addresses   = new string[]{};
        string[] subjects    = new string[]{};
        string[] messages   =  new string[]{};
            
            for (Session_Speaker__c  SessionSpeaker : SessionSpeakers ) {
                 addresses.add(SessionSpeaker.Speaker__r.Email__c);
                 subjects.add('Speaker Confirmation');
                 messages.add('Dear ' + sessionSpeaker.Speaker__r.First_Name__c +
                    ',\nYour session "' + sessionSpeaker.Session__r.Name + '" on ' +
                    sessionSpeaker.Session__r.Session_Date__c + ' is confirmed.\n\n' +
                    'Thanks for speaking at the conference!');
                
            }
           EmailManager.sendMail(addresses, subjects, messages);
        
    }
    

}