({
    //Show Toast Message to the End User
    showToast : function(toastType, toastTitle, toastMessage){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            type    :toastType,
            title   :toastTitle,
            message :toastMessage  
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
})