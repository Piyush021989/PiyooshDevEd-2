({
    packItem : function(component, event, helper) {
        var a = component.get("v.item", true);
        a.Packed__c=true;
        component.set("v.item", a); 
        var btn = event.getSource();
        btn.set("v.disabled",true);
    },
    
    validateItemForm: function(component) {
        var validExpense = component.find('itemform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        return validExpense;
    }
})