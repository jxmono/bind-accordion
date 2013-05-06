var COOKIE_NAME = "dev_lists";
module.exports = function (config) {

    config = processConfig(config);
    var dev_lists = "";

    // Temporar setTimeout
    // TODO Remove it!

    $(window).on("hashchange", function() {
        setTimeout(function() {
            initFromCookies();
        }, 100);
    });

    initFromCookies();

    // TODO on for dinamically elements. delegate? bind? live is deprecated.
    $(document).on("click", config.listHeader, function() {
        var clickedList = $(this);

        switch (config.list.type) {
            
            ///////////////////
            // jQuery function
            ///////////////////
            case "jQueryFunction":
                var icons = config.icons;
                var list = clickedList[config.list.value]();

                var listItemCookie = {
                    "id": list.attr("id"), // Supposing that every list has an id
                    // "listHeader": JSON.stringify(list),
                    // TODO Solve error: "Converting circular structure to JSON."
                    "visible": ""
                };

                // The list is hidden
                if (list.css("display") == "none"){
                    
                    listItemCookie.visible = true;

                    switch (config.icons.type) {
                        case "class":
                            clickedList.find(icons.container).removeClass(icons.hidden);
                            clickedList.find(icons.container).addClass(icons.visible);
                            break;

                        default: showError("This type of icons isn't yet implemented: " + config.icons.type);
                    }

                // The list is visible
                } else {
                    
                    listItemCookie.visible = false;

                    switch (config.icons.type) {
                        case "class":
                            clickedList.find(icons.container).addClass(icons.hidden);
                            clickedList.find(icons.container).removeClass(icons.visible);
                            break;

                        default: showError("This type of icons isn't yet implemented: " + config.icons.type);
                    }
                }

                dev_lists += "," + JSON.stringify(listItemCookie);
                $.cookie(COOKIE_NAME, dev_lists);

                list.toggle();

                break;
            default:
                showError("This type of list isn't yet implemented: " + config.list.type);
                break;
        }
    });
}

/*
    "config": {
        "listHeader":    ... (string)
        "list": {
            "type":      "jQueryFunction" or "selector",
            "value":     ... (jQuery function or a jQuery selector)
        },
        "icons": {
            "type":      "class" or "img"
            "visible":   "class/path_to_img"
            "hidden":    "class/path_to_img"
            "container": ... (jQuery selector)
        }
    }
*/

function processConfig(config) {

    config.list = config.list || {};
    config.icons = config.icons || {};
    
    return config;
}

function initFromCookies() {

    // TODO Cookies from module config
    dev_lists = $.cookie(COOKIE_NAME) || "";
    var lists = dev_lists.substring(2, dev_lists.length - 1) || "";
    lists = lists.split("},{") || [];

    for (var i = 0; i <  lists.length; i++) {
        lists[i] = "{" + lists[i] + "}";
        lists[i] = JSON.parse(lists[i]);
    }

    for (var i in lists) {
        
        var list = lists[i];
        
        if (list.visible) {
            $("#" + list.id).show();
            // TODO Solve error: "Converting circular structure to JSON."
            // list.listHeader.find(icons.container).removeClass(icons.hidden);
            // list.listHeader.find(icons.container).addClass(icons.visible);
        }
        else {
            $("#" + list.id).hide();
            // TODO Solve error: "Converting circular structure to JSON."
            // list.listHeader.find(icons.container).addClass(icons.hidden);
            // list.listHeader.find(icons.container).removeClass(icons.visible);
        }
    }
}

function showError(message) {
    alert(message);
}
