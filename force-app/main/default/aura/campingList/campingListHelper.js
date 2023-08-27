({
    addItem: function(component, item) {
        this.saveItem(component, item, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                //
            }
        });
    },
})