var commandFramework = commandFramework || {};
commandFramework.store = (function() {
    function Stack() {
        this.dataStore = [];
        this.top = 0;
    }

    Stack.prototype.push = function(data) {
        this.dataStore[this.top++] = data;
    };

    Stack.prototype.pop = function() {
        return this.dataStore[--this.top];
    };

    Stack.prototype.peek = function() {
        return this.dataStore[this.top-1];
    };

    Stack.prototype.clear = function () {
        this.top = 0;
    };

    Stack.prototype.length = function() {
        return this.top;
    };

    Stack.prototype.shift = function() {
        this.dataStore.shift();
    };

    var MAX_SIZE = 10;
    var stack = new Stack();

    function execute(command) {
        var result = command.execute();
        result.then(function(value) {
            if (stack.length() >= MAX_SIZE) {
                stack.shift();
            }
            stack.push(command);
        }).catch(function(reason) {
            console.warn(command+' execution failed: '+reason);
        });
    }

    return {
        execute: execute
    };
})();
