({
    
    clickCreateItem : function(component, event, helper) {    
        if(helper.validateItemForm(component)){
            // Create the new item
            var newItem = component.get("v.newItem");
            helper.createItem(component, newItem);
        }
    },
    
    validateItemForm: function(component) {
        var validExpense = component.find('itemform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        return validExpense;
    }
})