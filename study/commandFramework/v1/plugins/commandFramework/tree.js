var commandFramework = commandFramework || {};
commandFramework.Node = function () {
    function Node() {
        this.disabled = 'false';
        this.parent = null;
        this.children = [];
    }

    Node.prototype.addChild = function(child) {
        this.children.push(child);
    };

    Node.prototype.removeChild = function (child, parent) {
    };

    Node.prototype.isDisabled = function() {
        return this.disabled;
    };

    Node.prototype.setDisabled = function(disable) {
        this.disabled = disable;
    };

    Node.prototype.hasChildren = function() {
        if (this.children.length > 0) {
            return true;
        }
        return false;
    };

    return Node;
};

commandFramework.Tree = function () {
    function Tree() {
        var Node = commandFramework.Node();
        var node = new Node();
        this.root = node;
    }

    Tree.prototype.getById = function() {
    };

    Tree.prototype.getByPath = function() {
    };

    return Tree;
};