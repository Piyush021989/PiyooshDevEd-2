({
	handleClick : function(component, event, helper) {
        var btnclicked = event.getsource();              // the button
        var btnmessage = btnclicked.get("v.label");      // the button's label
        component.set("v.message",btnmessage);           // update our message
		
	}
})