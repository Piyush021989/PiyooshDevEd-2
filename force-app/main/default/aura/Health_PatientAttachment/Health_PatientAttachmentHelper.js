({
    goToUrl : function(component,event,helper){
        let row = component.get('v.row');
        let urlTarget = row.fileURL;
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": urlTarget
        });
        urlEvent.fire();
    },
    
    deleteFile : function(component,event,helper){
        var row = component.get('v.row');
        component.set("v.IsSpinner",true);
        
        let deleteFileAction = component.get('c.deleteFile');
        deleteFileAction.setParams({"fileIdToDelete": row.fileId});
        deleteFileAction.setCallback(this, function (response){
            let state = response.getState();
            
            if (component.isValid() && state == "SUCCESS"){
                component.set("v.IsSpinner",false);
                var compEvent = component.getEvent("patientFileItemActionEvent");
                compEvent.setParams({"action" : "Remove File" });
                compEvent.setParams({"fileId" : component.get("v.row").fileId });
                compEvent.fire();
            }
            else {
                component.set("v.IsSpinner",false);
                console.error(response.getError());
                console.log('Error: ' + JSON.stringify(response.getError()));
                this.showToast('', 'Attachment Error', 'error', 'pester');
            }
            
        });
        $A.enqueueAction(deleteFileAction);
    },
    
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
    
})