({
	FireEvent : function(component, event, helper) {
        var appEvent = $A.get("e.c:AppEventExample");
        appEvent.setParams({"message":" I am coming from Component A"});
        appEvent.fire();
	}
})