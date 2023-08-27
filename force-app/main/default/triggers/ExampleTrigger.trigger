trigger ExampleTrigger on Contact (after insert, after delete) {
    if (Trigger.isInsert) {
        Integer recordCount = Trigger.New.size();
        system.debug('Size ==>' +recordCount);
        // Call a utility method from another class
        // EmailManager.sendMail('Your email address', 'Trailhead Trigger Tutorial', 
        //            recordCount + ' contact(s) were inserted.');
        String address = 'piyush075@gmail.com';
        String subject = 'Trailhead Trigger Tutorial';
        String body    = recordCount + ' contact(s) were inserted.';
        String[]  addresses = new String[]{},
                  subjects = new String[]{},
                  messages = new String[]{};
                  addresses.add(address);
                  subjects.add(subject);
                  messages.add(body);
                  EmailManager.sendMail(addresses, subjects, messages);
    }
    else if (Trigger.isDelete) {
        // Process after delete
    }
}