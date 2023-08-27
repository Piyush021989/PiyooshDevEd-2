({
    handleRowAction : function(component, event, helper) {
        let action = event.getSource().get("v.title");
        let row = component.get('v.row');
        switch (action) {
            case 'Download':
                let urlTarget = row.fileURL;
                helper.goToUrl(component,event,helper,urlTarget);
                break;
            case 'Delete':
                helper.deleteFile(component,event,helper);
                break;
        }
        
    },
})