function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    var node = new Node(data);
    this.root = node;
}

function findIndex(arr, data) {
    var index;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
    return index;
}

Tree.prototype.traverseDepthFirst = function(cb) {
    (function recurse(currentNode) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
        }
        cb(currentNode);
    })(this.root);
};

Tree.prototype.traverseBreadthFirst = function(cb) {
    var queue = new Queue();
    queue.enqueue(this.root);
    currentTree = queue.dequeue();
    while(currentTree) {
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
        cb(currentTree);
        currentTree = queue.dequeue();
    }
};

Tree.prototype.contains = function(cb, traversal) {
    traversal.call(this, cb);
};

Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        cb = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
    this.contains(cb, traversal);
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};

Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index,
        cb = function(node) {
            if (node.data === fromData) {
                parent = node;
            }
        };
    this.contains(cb, traversal);
    if (parent) {
        index = findIndex(parent.children, data);
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }

    return childToRemove;
};
