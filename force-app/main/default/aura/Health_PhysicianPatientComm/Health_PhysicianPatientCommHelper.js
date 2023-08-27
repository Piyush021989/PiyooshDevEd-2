({
    getUserData: function(component,event,helper){
        var action = component.get("c.getUserDetails");
        action.setCallback(this,function(response){
            var state = response.getState();
            var data  = response.getReturnValue();
            console.log('User Data----' + JSON.stringify(data));
            if(state === "SUCCESS"){
                var healthDepartment = data.Health_Department__c;
                if(healthDepartment === 'Practitioner'){
                    component.set("v.isPractioner",true);
                }
                else{
                    component.set("v.isPractioner",false);
                }
            }
        });
        $A.enqueueAction(action); 
    },
    
    //this function will be used to retrieved Patient Data
    getPatientetail : function(component,event,helper) {
        var  action = component.get("c.getPatientDetailObj");
        var  patiId  = component.find("patId").get("v.value");
        action.setParams({
            patientIdLC : patiId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS"){
                console.log("Retrieved the Patient Detail");
            }
            else{
                console.log("Error while getting Patient Detail from Object");
            }
        });
        $A.enqueueAction(action); 
    },
    
    validateInput:function(component,event,helper){
        component.set("v.IsSpinner",true);
        if(component.get("v.patientIdVal") != null){
            helper.searchPatientDetails(component,event,helper);   
        }
        else{
            if(component.get("v.firstName") == null
               && component.get("v.lastName") == null 
               && component.get("v.phoneNumber") == null 
               && component.get("v.DOB") == null 
               && component.get("v.patientIdVal") == null)
            {
                component.set("v.IsSpinner",false);
                this.showToast('error','Error !!', 'Kindly Provide Either PatientID OR Name & DOB OR Name & Phone Number','pester');  
            }
            else{
                if(component.get("v.firstName") != null  
                   && component.get("v.lastName") != null)
                {
                    if(component.get("v.DOB") == null  
                       && component.get("v.phoneNumber") == null)
                    {
                        component.set("v.IsSpinner",false);
                        this.showToast('error','Error !!', 'Please provide Either Phone Number Or Date of Birth along with Name','pester');  
                    } 
                    else{
                        helper.searchPatientDetails(component,event,helper);
                    }
                }
            } 
        }
        
        
    }, 
    
    handleActive: function (cmp, event) {
        var tab   = event.getSource();
        var patId = cmp.get("v.patientRecord")
        console.log('patId    ' + patId);
        switch (tab.get('v.id')) {
            case 'diabetes' :
                this.injectComponent('c:Health_Diabetes', tab,patId);
                break;
            case 'cerc' :
                this.injectComponent('c:Health_CervicalCancer', tab,patId);
                break;
            case 'obsgyn':
                this.injectComponent('c:Health_OBSGyn', tab,patId);
                break;
        }
    },
    
    injectComponent: function (name, target,rec) {
        $A.createComponent(name, {
            patRecId: rec,
        }, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    },
    
    //clear Selection
    clearSelection:function(component,event){
        component.find('patIdField').forEach(function(f) {
            f.reset();
        });
        $A.get('e.force:refreshView').fire();
        
    },
    
    //Show Toast Message to the End User
    showToast : function(toastType, toastTitle, toastMessage,toastMode){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            type    :toastType,
            title   :toastTitle,
            message :toastMessage,
            mode:toastMode
        });
        toastEvent.fire();
    },
    
    //Check whether value has Empty or Non-Empty
    hasValue : function(inputField) {
        var isDefined = !$A.util.isUndefined(inputField);
        var isEmpty   = $A.util.isEmpty(inputField);
        
        if(isDefined && !isEmpty){
            return true;
        }else{
            return false;
        }
    },
    
    createPatientRecord : function(component,event,helper) {
        var showValidationError = false;
        var fields = component.find("patIdField");
        var vaildationFailReason = '';
        var currentDate = new Date().toJSON().slice(0,10);
        
        fields.forEach(function (field) {
            if(field.get("v.fieldName") === 'FirstName__c' && $A.util.isEmpty(field.get("v.value"))){
                showValidationError = true;
                vaildationFailReason = "The First Name cannot be empty!";
            } else if (field.get("v.fieldName") === 'LastName__c' && $A.util.isEmpty(field.get("v.value"))) {
                showValidationError = true;
                vaildationFailReason = "The Last Name cannot be empty!";
            } else if (field.get("v.fieldName") === 'Gender__c'  && $A.util.isEmpty(field.get("v.value"))) {
                showValidationError = true;
                vaildationFailReason = "Gender should not be Empty";
            } 
        });
        
        if (!showValidationError) {
            component.set('v.IsSpinner', true);
            component.find("patientRecord").submit();
        } else {
            component.find('errMessage').setError(vaildationFailReason);
            component.set('v.IsSpinner', false); 
        }
    },
    
    populateMeasTab: function(component,event,helper){
        component.set('v.measuresSect', true);
        component.set('v.attachmentSec', true);
        var fields = component.find("patIdField");
        fields.forEach(function (field) {
            if(field.get("v.fieldName") === 'Measures__c' && !$A.util.isEmpty(field.get("v.value"))){
                let selectedMeas =  field.get("v.value");
                let selectedMea = selectedMeas.split(';');
                component.set("v.selectedMeasures",selectedMea);
            } 
        });
        
        let arrayOfMeas = component.get("v.selectedMeasures");
        
        arrayOfMeas.forEach(function (item, index) {
            if(item === 'Diabetes'){
                component.set("v.diaTab", true);
            } else if(item === 'Cervical Cancer'){
                component.set("v.ccTab", true);
            } else if(item === 'OB-GYN'){
                component.set("v.obsgynTab", true);
            }
        });
    },
    
    searchPatientDetails: function(component,event,helper){
        var patId =  component.get("v.patientIdVal");
        var firstName = component.get("v.firstName");
        var lastName  = component.get("v.lastName");
        var dob       = component.get("v.DOB");
        var phoneNum  = component.get("v.phoneNumber");
        
        var action = component.get("c.fetchPatDetails");
        
        action.setParams({
            patId:patId,
            firstName:firstName,
            lastName:lastName,
            dob:dob,
            phoneNum:phoneNum
        });
        
        action.setCallback(this,function(response){
            var status = response.getState();
            if(status === "SUCCESS"){
                var returnObj = response.getReturnValue();
                if(helper.hasValue(returnObj)){
                    component.set('v.patientRecord', returnObj);
                    component.set('v.saved', false);
                    component.set('v.measuresSect', false);
                    component.set('v.attachmentSec', false);
                    component.set("v.IsSpinner",false);
                    component.set("v.getPatRec",true);   
                }
                else{
                    component.set('v.measuresSect', false);
                    component.set('v.saved', false);
                    component.set("v.IsSpinner",false);
                    component.set('v.attachmentSec', false);
                    this.showToast('error','Error !!', 'No Patient Details found. Try to create a new one','pester');  
                }
            }
            else{
                component.set("v.IsSpinner",false);
            }
        });
        $A.enqueueAction(action);
        
    },
    
    getFilesHelper : function(component, event, helper) {
        component.set('v.IsSpinner', true);
        let singleFile   = '{0} file was added to Patient.';
        let multipleFile = '{0} files were added to Patient.';
        
        var uploadedFiles = event.getParam("files");
        component.set("v.filesCount", uploadedFiles.length);
        
        let getFilesAction = component.get('c.getFiles');
        getFilesAction.setParams({
            "recordId": component.get("v.patientRecord")
        });
        getFilesAction.setCallback(this, function (response){
            let state = response.getState();
            
            if (component.isValid() && state == "SUCCESS"){
                component.set('v.IsSpinner', false);
                let responseValue = response.getReturnValue();
                let rows = this.buildRows(component, responseValue);
                component.set('v.rows', rows);
                component.set("v.showButtonActions",false);
                
                var fileCount = component.get("v.filesCount");
                var message;
                if( fileCount == 1 ){
                    message = singleFile.replace('{0}',fileCount);
                }else{
                    message = multipleFile.replace('{0}',fileCount);
                }
                this.showToast('', message, 'success', 'pester');
            }
            else {
                component.set('v.IsSpinner', false);
                this.showToast('', 'Attachment Error', 'error', 'pester');
            }
        });
        $A.enqueueAction(getFilesAction);
    },
    
    
    buildRows : function(component,response){
        let rows = [];
        if(response){
            var urlPrefix = '';
            if( component.get('v.communityUrlPrefix') != null && component.get('v.communityUrlPrefix').length > 0 ){
                var sPageURL = decodeURIComponent(window.location);
                urlPrefix = sPageURL.split( component.get('v.communityUrlPrefix') )[0]+component.get('v.communityUrlPrefix');
            }
            
            for(let i = 0; i < response.length; i++){
                let row = {};
                
                row.file 	= response[i].file;
                row.fileId 	= response[i].file.Id;
                row.title 	= response[i].file.Title;
                row.fileURL = urlPrefix+'/sfc/servlet.shepherd/document/download/'+response[i].file.Id;
                row.fileExtension 	= response[i].file.FileExtension;
                row.contentsize 	= response[i].ContentSize;
                row.caseAttachmentRecord = response[i].visibility;
                row.urlPrefix = urlPrefix;
                row.canDelete = response[i].canDelete;
                
                rows.push(row);
            }
        }
        
        return rows;
    },
    
    //Delete functionality Of files
    removeFile : function(component,event,helper){
		let fileId = event.getParam("fileId");
        let row;
        let rows = component.get('v.rows');
        
        let i = 0;
        for(; i< rows.length; i++){
            if( rows[i].fileId == fileId ){
                row = rows[i];
                break;
            }
        }
        rows.splice(i, 1);
        component.set('v.rows', rows);
        
        this.showToast('success','Success !!', 'Attachment Deleted Successfully','pester');  
    },
})