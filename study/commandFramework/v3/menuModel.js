commandFramework = commandFramework || {};
/**
 * Model manage the menu item tree.
 */
commandFramework.menuModel = (function () {

    var topMenu = new RootMenuItem('top-menu');
    var contextMenuItem = new RootMenuItem('context-menu');
    var model = {
        topMenuItem: topMenu,
        contextMenuItem: contextMenuItem
    };

    function RootMenuItem(type) {
        this.module = '';
        this.id = '';
        this.name = '';
        this.commandId =  '';
        this.location = '';
        this.type = type;
        this.items = [];
        this.disabled = false;
        this.parent = '';
        this.children = [];
    }

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

/*
    function MenuItem(obj) {
        var item = Object.create(commandFramework.Node().prototype, {
            module: {value: obj.module},
            id: {value: obj.id},
            name: {value: obj.name},
            commandId: {value: obj.commandId},
            location: {value: obj.location},
            type: {value: obj.type},
            items: {value: obj.items},
            disabled: {value: obj.disabled},
            parent: {value: ''},
            children: {value: []}
        });
        return item;
    }*/

    function createMenuItem(obj) {
        var rootMenuItem;
        obj.items.forEach(function(item) {
            if (item.type === 'top-menu') {
                rootMenuItem = model.topMenuItem;
            } else {
                rootMenuItem = model.contextMenuItem;
            }
            if (isExistMenuItem(item, rootMenuItem)) {
                console.warn("exist menu item");
            } else {
                item.module = obj.module;
                setMenuItem(item, rootMenuItem); 
            }
        });
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

    function removeMenuItem(menuItem, location) {
        if (location) {
            var subStings = location.split('/');
            var itemNameIndex = subStings.length-1;
            var parentItem = findMenuItem(subStings[itemNameIndex-1], menuItem);
            var item = findMenuItem(subStings[itemNameIndex], menuItem);
            var index = parentItem.items.indexOf(item);
            if (index >= 0) {
                parentItem.items.splice(index, 1);
            }
        }
    }

    function findMenuItem(id, model) {
        var item;
        if (id === model.id) {
            item = model;
        } else {
            if ('items' in model && Array.isArray(model.items)) {
                model.items.some(function(child) {
                    item = findMenuItem(id, child);
                    if (item) {
                        return true;
                    }
                });
            }
        }
        return item;
    }

    function isExistMenuItem(item, model) {
        var exist = false;
        if (findMenuItem(item.id, model)) {
            exist = true;
        }
        if ('items' in item && Array.isArray(item.items)) {
            exist = false;
            item.items.some(function(child) {
                if(isExistMenuItem(child, model)) {
                    exist = true;
                }
                return exist;
            });
        }
        return exist;
    }

    function getTopMenuItem(id) {
        if (id) {
            return findMenuItem(id, model.topMenuItem); 
        } else {
            return model.topMenuItem;
        }
    }

    function getContextMenuItem(id) {
        if (id) {
            return findMenuItem(id, model.contextMenuItem);
        } else {
            return model.contextMenuItem;
        }
    }

    function setMenuItem(item, rootMenuItem) {
        if (!item.id && !item.module) {
            console.warn('need menu id or menu module name');
            return;
        }
        if ('items' in item && Array.isArray(item.items)) {
            item.items.forEach(function(child) {
                if (!child.module) {
                    child.module = item.module;
                }
            });
        }
        moveMenuItem(item, rootMenuItem);
    }

    function moveMenuItem(item, menuItem) {
        if (item.location) {
            var subStings = item.location.split('/');
            var itemIndex = subStings.length-1;
            var parentItem = findMenuItem(subStings[itemIndex-1], menuItem);
            var selector = subStings[itemIndex].split('?');
            var siblingItem = findMenuItem(selector[0], menuItem);
            var siblingItemIndex = parentItem.items.indexOf(siblingItem);
            switch (selector[selector.length-1]) {
                case 'after':
                    if (parentItem.items[siblingItemIndex+1] !== item) {
                        parentItem.items.splice(siblingItemIndex+1, 0, item);
                    }
                    break;
                case 'before':
                    if (parentItem.items[siblingItemIndex-1] !== item) {
                        parentItem.items.splice(siblingItemIndex, 0, item);
                    }
                    break;
                case 'under':
                    if (!siblingItem.items) {
                        siblingItem.items = [];
                    }
                    if (siblingItem.items[siblingItem.items.length-1] !== item) {
                        siblingItem.items.push(item);
                    }
                    break;
                default:
                    if (parentItem.items[parentItem.items.length-1] !== item) {
                        parentItem.items.push(item);
                    }
                    break;
            }
        } else {
            console.warn('need location');
        }
    }

    return {
        model: model, //imsi
        createMenuItem: createMenuItem,
        removeMenuItem: removeMenuItem,
        getTopMenuItem: getTopMenuItem,
        getContextMenuItem: getContextMenuItem
    };
})();