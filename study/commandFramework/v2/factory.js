var commandFramework = commandFramework || {};
/**
 * This file create command class.
 */
commandFramework.factory = (function() {

    function toPascalCase(str) {
        var result = '';
        str.replace(/\w+/g, function(txt){
            var word = str.match(txt);
            word.forEach(function(element) {
                result += element[0].toUpperCase() + element.substr(1).toLowerCase();
            });
        });
        return result;
    }

    function createCommand(id) {
        var command;
        if (commandFramework.registry.getCommandRegistry(id)) {
            var constructorName = toPascalCase(id) + 'Command';
            var Constructor = pluginExtension.commands[constructorName]();
            command = new Constructor(id);
        }

        return command;
    }

    return {
        createCommand: createCommand
    };
})();
