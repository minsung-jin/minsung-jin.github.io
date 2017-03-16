commandFramework = commandFramework || {};
/**
 * This file create menu items.
 */
commandFramework.menuFactory = (function () {

    var menuModel = commandFramework.menuModel;

    function MenuItem(obj) {
        this.module = obj.module;
        this.id = obj.id;
        this.name = obj.name;
        this.commandId =  obj.commandId;
        this.location = obj.location;
        this.type = obj.type;
        this.items = obj.items;
        this.disabled = obj.disabled;
        this.parent = '';
        this.children = [];
    }
    MenuItem.prototype = commandFramework.Node().prototype;

    function createTopMenuItem(id) {
        var item = menuModel.getTopMenuItem(id);
        return appendMenuItem(item);
    }

    function createContextMenuItem(id) {
        var item = menuModel.getContextMenuItem(id);
        return appendMenuItem(item);
    }
    
    function appendMenuItem(item) {
        var childItem;
        var menuItem = new MenuItem(item);
        if ('items' in item && Array.isArray(item.items)) {
            item.items.forEach(function(child) {
                childItem = appendMenuItem(child);
                menuItem.addChild(childItem);
            });
        }
        return menuItem;
    }

    return {
        createTopMenuItem: createTopMenuItem,
        createContextMenuItem: createContextMenuItem,
    };
})();