public WITHOUT SHARING class  Health_PhysicianPatientController {
    
    @AuraEnabled
    public static user getUserDetails(){
        User getUser = new User();
        getUser = [Select Id,Health_Department__c from User Where Id = :UserInfo.getUserId()];
        return getUser;
    }
    
    @AuraEnabled
    public static string createPatientRec(string firstName,string lastName,string DOB,string measures,string phoneNumber,string gender){
        System.debug('Data Received==>' + firstName + '  ' + lastName + '  ' + DOB + '  ' + measures + '  ' + phoneNumber);
        List<Health_Patient__c>  listOfPatRec = new List<Health_Patient__c>();
        List<Id>                            listOfPatId   = new List<Id>();
        string recordTypeId = '';
        
        Health_Patient__c patRec =  new Health_Patient__c();
        patRec.FirstName__c           = firstName;
        patRec.LastName__c            = lastName;
        patRec.DOB__c                 = Date.valueOf(DOB);
        patRec.Measures__c            = measures;
        patRec.PhoneNumber__c         = phoneNumber;
        patRec.Gender__c              = gender;
        
        listOfPatRec.add(patRec);
        
        if(listOfPatRec != null){
            String msg = '';
            try {
                // DML statement
                Database.SaveResult[] srList = Database.insert(listOfPatRec, false);
                // Iterate through each returned result
                for (Database.SaveResult sr : srList) {
                    if (sr.isSuccess()) {
                        // Operation was successful, so get the ID of the record that was processed
                        System.debug('Successfully inserted Empower to Delight. E2D ID: ' + sr.getId());
                        listOfPatId.add(sr.getId());
                    }
                    else {
                        // Operation failed, so get all errors                
                        for(Database.Error err : sr.getErrors()) {
                            System.debug('The following error has occurred.');                    
                            System.debug(err.getStatusCode() + ': ' + err.getMessage());
                            System.debug('RSA Argentina Goodwill fields that affected this error: ' + err.getFields());
                        }
                    }
                }
                
                If(listOfPatId != null){
                    return listOfPatId[0];
                }
                else{
                    return null;
                }
                
            } catch(DmlException e){
                for (Integer i = 0; i < e.getNumDml(); i++) {
                    //Get Validation Rule & Trigger Error Messages
                    msg =+ e.getDmlMessage(i) +  '\n' ;
                }
                //throw DML exception message
                throw new AuraHandledException(msg);
                
            }catch(Exception e){
                //throw all other exception message
                throw new AuraHandledException(e.getMessage());
            }
            
        } else {
            return 'Insert Failed----->';
        }
    }
    
    @AuraEnabled
    public static string fetchPatDetails(string patId, string firstName, string lastName, string dob, string phoneNum){
        Date DOBfromLC;
        if(dob != null){
            DOBfromLC = Date.valueOf(dob);
        }
        List<Health_Patient__c>  listOfPatRec = [SELECT Id 
                                                 FROM Health_Patient__c
                                                 WHERE Name =:patId
                                                 OR (FirstName__c = :firstName AND LastName__c = :lastName AND PhoneNumber__c = :phoneNum)
                                                 OR (FirstName__c = :firstName AND LastName__c = :lastName AND DOB__c = :DOBfromLC)];
        if(!listOfPatRec.isEmpty()){
            System.debug('Sending the Patient ID=='+listOfPatRec[0].Id);
            return  listOfPatRec[0].Id;
        }
        else{
            return null;
        }
    }
    
    @AuraEnabled
    public static Health_Patient__c getDiabData(string patientIdLC){
        
        List<Health_Patient__c>  listOfPatRec = [Select Id,HbA1C_8__c,Pt_on_Insulin__c,Provider_Name__c,Managed_by_Endocrinologist__c,Age__C,Gender__C from Health_Patient__c
                                                 Where Id = :patientIdLC];
        if(!listOfPatRec.isEmpty()){
            return  listOfPatRec[0];
        }
        else{
            return null;
        }
    }
    
    @AuraEnabled
    public static List<AttachmentStruct> getFiles(String recordId){
        List<AttachmentStruct> fileStructList = new List<AttachmentStruct>();
        if(String.isBlank(recordId))
            return null;
        
        Health_Patient__c patAttachmentRecord = getPatAttachmentRecords(recordId);
        
        for(ContentDocumentLink contentLink : patAttachmentRecord.ContentDocumentLinks){
            AttachmentStruct fileStruct = new AttachmentStruct();
            
            
            fileStruct.file 			= contentLink.ContentDocument;
            fileStruct.ContentSize 	    = fileSizeToString(contentLink.ContentDocument.ContentSize);
            
            
            fileStructList.add(fileStruct);
        }
        
        System.debug('fileStructList ---' + fileStructList);
        
        return fileStructList; 
    }
    
    public static Health_Patient__c getPatAttachmentRecords(String recordId){
        Health_Patient__c patRecord;
        try{
            patRecord = [
                SELECT Id,
                (
                    SELECT 
                    ContentDocumentId, ContentDocument.Title,
                    ContentDocument.LatestPublishedVersionId,
                    ContentDocument.LastModifiedDate,
                    ContentDocument.CreatedById, ContentDocument.CreatedBy.Name,
                    ContentDocument.ContentSize, ContentDocument.FileExtension
                    FROM ContentDocumentLinks
                    ORDER BY ContentDocument.CreatedDate DESC
                )
                FROM Health_Patient__c
                WHERE Id =: recordId
            ];
        } catch(QueryException qE){
            System.debug('Exception----' + qE.getMessage());
        }
        System.debug('patRecord ---' + patRecord);
        
        return patRecord;
    }
    
    @AuraEnabled
    public static void deleteFile(String fileIdToDelete){
        if(String.isBlank(fileIdToDelete))
            return;
        
        try{
            ContentDocument file = new ContentDocument(Id = fileIdToDelete);
            DELETE file;
        }
        catch(DmlException dE){
            throw new AuraHandledException(JSON.serialize(String.valueOf(dE)));
        }
    }
    
    public static String fileSizeToString(Long value)
    {
        value = value == null ? 0 : value;
        
        /* string representation if a file's size, such as 2 KB, 4.1 MB, etc */
        if (value < 1024)
            return string.valueOf(value) + ' Bytes';
        
        // KB
        else if (value >= 1024 && value < (1024*1024))
        {		
            Decimal kb = Decimal.valueOf(value);
            kb = kb.divide(1024,2);
            return string.valueOf(kb) + 'KB';
        }
        
        // MB
        else if (value >= (1024*1024) && value < (1024*1024*1024))
        {
            Decimal mb = Decimal.valueOf(value);
            mb = mb.divide((1024*1024),2);
            return string.valueOf(mb) + 'MB';
        }
        
        // GB
        else
        {
            Decimal gb = Decimal.valueOf(value);
            gb = gb.divide((1024*1024*1024),2);
            
            return string.valueOf(gb) + 'GB';
        }
    }
    
    
    public class AttachmentStruct{
        @AuraEnabled
        public String orgLink                  {get;set;}
        @AuraEnabled
        public String fileId                   {get;set;}
        @AuraEnabled
        public ContentDocument file            {get;set;}
        @AuraEnabled
        public String LastModifiedDateTimeZone {get; set;}
        @AuraEnabled
        public String ContentSize              {get; set;}
        @AuraEnabled
        public String fileDownloadLink         {get; set;}
        @AuraEnabled
        public Boolean canDelete               {get; set;}
    }
}