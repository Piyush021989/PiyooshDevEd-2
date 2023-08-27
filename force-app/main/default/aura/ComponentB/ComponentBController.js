({
	getEventMessageFromAppEvent : function(component, event, helper) {
		var message = event.getParam("message");
        component.set("v.messageFromEvent",message);
	}
})