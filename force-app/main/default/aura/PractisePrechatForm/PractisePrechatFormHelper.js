({
    createStartChatDataArray: function() {
        
        var input = document.querySelector(".prechatFields").childNodes;
        for (var i = 0; i < inputs.length; i++) {
            
            var info = {
                name: inputs[i].name,
                label: inputs[i].label,
                value: inputs[i].value
            };
            infos.push(info) ;
        }
        
        return info;
    },
    
    renderField:function(prechatFields){
        console.log('fields    --' + JSON.stringify(prechatFields));
        prechatFields.forEach(function(field){
            var input = document.createElement("input");
            // Set general attributes
            input.type = componentName;
            input.class = field.label;
            input.placeholder = "Your"+field.label+" here.";
            // Set attributes required for starting a chat
            input.name = field.name;
            input.label = field.label;
            input.options = field.picklistOptions
            input.required= field.required;
            
            // Add email input to the DOM
            document.querySelector(".prechatFields").appendChild(input);
        })

    },
});