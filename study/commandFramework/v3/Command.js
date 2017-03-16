var commandFramework = commandFramework || {};
commandFramework.command = function() {

    function Command(id) {
        this.id = id;
    }

    Command.prototype.getId = function() {
        return this.id;
    };
    
    Command.prototype.execute = function() {
        // do something
        throw new Error('execute() should be implemented by ' + this.constructor.name);
    };

    Command.prototype.undo = function() {
        // undo something
    };

    Command.prototype.redo = function() {
        // redo something
    };

    Command.prototype.canExecute = function() {
        // check status
        return true;
    };

    Command.prototype.toString = function() {
        return '<Command> '+this.id;
    };
    return Command;
};