({
    clickCreate: function(component, event, helper) {
        var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            // component.find('expenseform') gets a reference to the array of <lightning:input>
            // The JavaScript reduce() method reduces the array to a single value that’s captured by validSoFar
            // inputCmp.get('v.validity').valid returns the validity of the current input field in the array.
            // inputCmp.showHelpMessageIfInvalid() displays an error message for invalid fields.<lightning:input> 
            // provides default error messages that can be customized by attributes like messageWhenRangeUnderflow
            
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            // Create the new expense
            var newExpense = component.get("v.newExpense");
            console.log("Create expense: " + JSON.stringify(newExpense));
            helper.createExpense(component, newExpense);
            
        }
    },
    
    createExpense: function(component, newExpense) {
        let createEvent = component.getEvent("createExpense");
        createEvent.setParams({ "expense": newExpense });
        createEvent.fire();
    },
})