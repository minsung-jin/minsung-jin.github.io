commandFramework = commandFramework || {};
/**
 * registry is meta for the command framework
 */
commandFramework.registry = (function () {

    var commandMap = new Map();
    var shortcutMap = new Map();
    var menuItemMap = new Map();
    var registry = {
        commands: commandMap,
        shortcuts: shortcutMap
    };

    function getCommandRegistry() {
        return registry.commands;
    }

    function setCommandRegistry(obj) {
        obj.commands.forEach(function(item) {
            commandMap.set(item.id, item.shortcut);
            var shortcut = {
                commandId: item.id,
                propagate: item.shortcut.propagate
            };
            shortcutMap.set(item.shortcut.defaultKey, shortcut);
        });
        registry.commands = commandMap;
        registry.shortcuts = shortcutMap;
    }

    function getShortcutRegistry(id) {
        return registry.shortcuts.get(id);
    }

    function setShortcutRegistry(id, obj) {
        registry.shortcuts.set(id, obj);
    }

    return {
        getCommandRegistry: getCommandRegistry,
        setCommandRegistry: setCommandRegistry,
        getShortcutRegistry: getShortcutRegistry,
        setShortcutRegistry: setShortcutRegistry
    };
})();