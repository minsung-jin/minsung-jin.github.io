var commandFramework = commandFramework || {};
/**
 * This file is defining method for dynamic menu.
 */
var pluginExtension = pluginExtension || {};
pluginExtension.help = {};
pluginExtension.help.updateTopMenu = function() {
    var items = [];
    var text = document.getElementById('info').innerHTML;
    var menuItem = commandFramework.service.getTopMenuItem('help');
    if (text !== 'Information' && menuItem.items.length > 1) {
        menuItem.items.pop();
    } else {
        var item = {
            module: 'help-plugin',
            id: 'about-help',
            name: 'About',
            commandId: 'about-help',
            location: '/help/about-help',
            type: 'top-menu',
            items: [],
            disabled: 'false',
            parent: 'help',
            children: []
        };
        menuItem.items.push(item);
    }
    items.push('help');
    return items;
};

pluginExtension.file = {};
pluginExtension.file.updateTopMenu = function() {
    var items = [];
    var text = document.getElementById('editor').value;
    var menuItem = commandFramework.service.getTopMenuItem('save-file');
    if (text) {
        menuItem.disabled = 'false';
    } else {
        menuItem.disabled = 'true';
    }
    console.log(menuItem.disabled);
    items.push('save-file');
    return items;
};
