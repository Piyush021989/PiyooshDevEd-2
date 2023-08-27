({
    handleActive: function (cmp, event) {
        var tab = event.getSource();
        switch (tab.get('v.id')) {
            case 'diabetes' :
                this.injectComponent('c:DiabetesDetail', tab);
                break;
            case 'cerc' :
                this.injectComponent('c:CervicalCancerDetail', tab);
                break;
            case 'obsgyn':
                this.injectComponent('c:DiabetesDetail', tab);
                break;
        }
    },
    injectComponent: function (name, target) {
        $A.createComponent(name, {
            // no attrs
        }, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    }
});