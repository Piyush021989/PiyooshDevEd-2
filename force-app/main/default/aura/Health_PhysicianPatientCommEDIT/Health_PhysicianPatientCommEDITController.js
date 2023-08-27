({
    loadInitdata: function(component,event,helper){
        var patiId = component.get("v.patientRecord");
        var action = component.get("c.getDiabData");
        
        action.setParams({
            patientIdLC : patiId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS"){
                var getData = response.getReturnValue();
                console.log("Retrieved the Diabitic Data Detail");
                if(getData.HbA1C_8__c === true){
                    component.set("v.selHbA1C", true);
                }
                else{
                    component.set("v.selHbA1C", false); 
                }
                
                if(getData.Pt_on_Insulin__c === true){
                    component.set("v.selInsu", true);
                }
                else{
                    component.set("v.selInsu", false);
                }
                
                if(getData.Provider_Name__c === "Others"){
                    component.set('v.proOther',true); 
                }
                else{
                    component.set('v.proOther',false);
                }                
                
                if(getData.Managed_by_Endocrinologist__c === true){
                    component.set("v.selEndo", true);
                }
                else{
                    component.set("v.selEndo", false); 
                }                
            }
            else{
                console.log("Error while getting Patient Detail from Object");
            }
        });
        $A.enqueueAction(action); 
        
        helper.getFilesHelper(component,event,helper);
        
    },
    
    handleOnSuccess : function(component, event, helper) {
        component.set("v.IsSpinner",true);
        var record = event.getParam("response");
        var apiName = record.apiName;
        var myRecordId = record.id; // ID of updated or created record
        
        component.set("v.IsSpinner",false);
        helper.showToast('success', 'Success','Patient Record Updated Successfully','pester');
    },
    
    ShowHbA1C:function(component,event,helper){
        var checkbox = component.find('HbA1C8').get('v.value'); 
        component.set("v.selHbA1C", checkbox);
    },
    
    ShowSpecifyInsu:function(component,event,helper){
        var checkbox = component.find('ptInsulin').get('v.value'); 
        component.set("v.selInsu", checkbox);
    },
    
    selectProvider:function(component,event,helper){
        var selectedProvider = component.find("providerName").get("v.value");
        if(selectedProvider === "Others"){
            component.set('v.proOther',true);  
        }
        else{
            component.set('v.proOther',false);
        }
    },
    
    manageEndo:function(component,event,helper){
        var checkbox = component.find('Endocrinologist').get('v.value'); 
        component.set("v.selEndo", checkbox);
    },
    
    handleFileItemAction : function(component, event, helper) {
        let action = event.getParam('action');
        switch (action) {
            case 'Remove File':
                helper.removeFile(component, event, helper);
                break;
        }
    },
    
    handleUploadFinished : function(component, event, helper) {
        helper.getFilesHelper(component, event, helper);
    },
    
    handleOnSubmit:function(component,event,helper){
        event.preventDefault(); //Prevent default submit
        var eventFields    = event.getParam("fields"); //get the fields
        
        var deselectEndo   = component.get("v.selEndo");
        var deselectHbA1C  = component.get("v.selHbA1C");
        var deselectInsu   = component.get("v.selInsu");
        console.log('deselectEndo--  ' +  deselectEndo  + ' deselectHbA1C--   ' + deselectHbA1C + '  deselectInsu---   ' + deselectInsu);
        
        if(!deselectEndo){
            eventFields["Managed_by_Endocrinologist__c"] = false;  
            eventFields["Provider_Name__c"] = '';  
            eventFields["Other_Provider_Name__c"] = '';
            component.set("v.deselSubmit",true);
        }
        if(!deselectHbA1C) {
            eventFields["HbA1C_8__c"] = false; 
            eventFields["HbA1C__c"] = '';  
            component.set("v.deselSubmit",true);
        }
        if(!deselectInsu) {
            eventFields["Pt_on_Insulin__c"] = false;
            eventFields["Specify_Insulin__c"] = '';  
            component.set("v.deselSubmit",true);
        }
        
        var finalDeselectSubmit =  component.get("v.deselSubmit");
        console.log('finalDeselectSubmit   ' + finalDeselectSubmit);
        
        if(finalDeselectSubmit){
            console.log('Inside the Submit Event FIELD');
            component.find('patientRecord').submit(eventFields); 
        }else{
            console.log('Inside the Submit REGULAR');
            component.find('patientRecord').submit();
        }
    },
    
})