module.exports = function (config) {

    config = processConfig(config);

    // TODO Clean the code

    // TODO Set initial state on page load
    // using cookies?

    // Click on list header
    // $(config.listHeader).delegate("click", function() {
    setTimeout(function() {
        $(config.listHeader).on("click", function() {
            var clickedList = $(this);

            switch (config.list.type) {
                
                // Is a jQuery function
                case "jQueryFunction":
                    var icons = config.icons;
                    var list = clickedList[config.list.value]();

                    // The list is hidden
                    if (list.css("display") == "none"){
                        
                        switch (config.icons.type) {
                            case "class":
                                clickedList.find(icons.container).removeClass(icons.hidden);
                                clickedList.find(icons.container).addClass(icons.visible);
                            
                            break;
                            // TODO Check for errors
                        }

                    // The list is visible
                    } else {
                        switch (config.icons.type) {
                            case "class":
                                clickedList.find(icons.container).addClass(icons.hidden);
                                clickedList.find(icons.container).removeClass(icons.visible);
                            
                            break;
                            // TODO Check for errors
                        }
                    }
                    list.toggle(function() {
                        
                    });
                    break;
            }
        });
    }, 2000);
}

/*
    "config": {
        "listHeader": ".projectFolder",
        "list": {
            "type": "jQueryFunction",
            "value": "next"
        },
        "icons": {
            "type": "class"
            "visible": "icon-chevron-down"
            "hidden": "icon-chevron-right"
            "container": ".icon"
        }
    }
*/

function processConfig(config) {

    // TODO Build function
    
    return config;
}
