({
    //This function will be called During the Page Load
    loadRecorddata : function(component, event, helper) {
         helper.getUserData(component,event,helper);
        //helper.getPatientetail(component,event,helper);
    },
    
    //This function will be called when user click on the "SEARCH" button
    searchClick: function(component,event,helper){
        helper.validateInput(component,event,helper); 
    },
    
    //This function will be called when user click on the "CLEAR" button
    clearDetails:function(component,event,helper){
        helper.clearSelection(component,event);
    },
    
    //This function will be called when user click on the "CREATE NEW PATIENT" button
    createNewPatient: function(component, event, helper){
        var firstName    = component.find("firstName").get("v.value");
        var lastName     = component.find("lastName").get("v.value");
        
        if(!firstName || !lastName){
            helper.showToast('error', 'Error','Required fields are missing','pester');
        } 
    },
    
    //This function will be for the Lightning Tab Set
    handleActive: function (cmp, event, helper) {
        helper.handleActive(cmp, event);
    },
    
    handleOnSuccess: function(component, event, helper){
        var record = event.getParam("response");
        var apiName = record.apiName;
        var myRecordId = record.id; // ID of updated or created record
        component.set("v.patientRecord",myRecordId);
        component.set("v.disableNewCreate",true);
        helper.showToast('success', 'Success','Record Created Successfully','pester');
        component.set('v.saved', false);
        component.set('v.IsSpinner', false);
        
        helper.populateMeasTab(component,event,helper);
        
        var appEvent = $A.get("e.c:PatientEvent");
        appEvent.setParams({
            "patientIdFromParent" : myRecordId});
        appEvent.fire();
    },
    
    handleBackToHome: function(component, event, helper){
        component.set('v.saved', true);
        component.set('v.measuresSect', false);
        component.set('v.attachmentSec', false);
        component.set('v.getPatRec', false);
    },
    
    handleError: function (component, event, helper) {
        event.preventDefault()
        component.set('v.IsSpinner', false);
        var description = event.getParam("error");
        component.find('errMessage').setError(description);
    },
    
    handleSubmit:function(component,event,helper){
        event.preventDefault();
        helper.createPatientRecord(component,event,helper); 
    },
    
    handleUploadFinished : function(component, event, helper) {
        helper.getFilesHelper(component, event, helper);
    },
    
    handleFileItemAction : function(component, event, helper) {
        let action = event.getParam('action');
        switch (action) {
            case 'Remove File':
                helper.removeFile(component, event, helper);
                break;
        }
    },
})