({
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
    
    removeFile : function(component,event,helper){
        let fileId = event.getParam("fileId");
        let row;
        let rows = component.get('v.rows');
        
        let i = 0;
        for(; i<rows.length; i++){
            if( rows[i].fileId == fileId ){
                row = rows[i];
                break;
            }
        }
        rows.splice(i, 1);
        component.set('v.rows', rows);
    },
    
    getFilesHelper : function(component, event, helper) {
        component.set('v.IsSpinner', true);
       
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
            }
            else {
                component.set('v.IsSpinner', false);
                this.showToast('error','Error !!', 'Attachment Error','pester');  
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
})