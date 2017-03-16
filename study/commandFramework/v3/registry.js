commandFramework = commandFramework || {};
/**
 * registry is meta for the command framework
 */
commandFramework.registry = (function () {

    var registry = {
        commands: {},
        shortcuts: {}
    };

    function getCommandRegistry(id) {
        if (id) {
            return registry.commands.id;
        }
        if (registry.commands) {
            return registry.commands;
        }
    }

    function setCommandRegistry(obj) {
        obj.commands.forEach(function(item) {
            if (item.hasOwnProperty('id')) {
                registry.commands[item.id] = item.shortcut;
            }
            if (item.shortcut.defaultKey) {
                var shortcut = {
                    commandId: item.id,
                    keepDefault: item.keepDefault,
                    propagate: item.shortcut.propagate
                };
                registry.shortcuts[item.shortcut.defaultKey] = shortcut;
            }
        });
    }

    function getShortcutRegistry(id) {
        if (id) {
            return registry.shortcuts[id];
        }
        if (registry.shortcuts) {
            return registry.shortcuts;
        }
    }

    function setShortcutRegistry(id, obj) {
        registry.shortcuts[id] = obj;
    }

    return {
        registry: registry,  //imsi
        getCommandRegistry: getCommandRegistry,
        setCommandRegistry: setCommandRegistry,
        getShortcutRegistry: getShortcutRegistry,
        setShortcutRegistry: setShortcutRegistry
    };
})();