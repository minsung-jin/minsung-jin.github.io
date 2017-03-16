var commandFramework = commandFramework || {};
/**
 * This file is defining method for excution of command.
 */
var pluginExtension = pluginExtension || {};
pluginExtension.commands = {};
pluginExtension.commands.NewFileCommand = function () {
    function NewFileCommand(id) {
        this.id = id;
    }
    NewFileCommand.prototype = commandFramework.command().prototype;
    NewFileCommand.prototype.execute = function () {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The new file has been clicked.';
            resolve();
        });
    };
    return NewFileCommand;
};

pluginExtension.commands.OpenFileCommand = function () {
    function OpenFileCommand(id) {
        this.id = id;
    }
    OpenFileCommand.prototype = commandFramework.command().prototype;
    OpenFileCommand.prototype.execute = function () {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The open file has been clicked.';
            resolve();
        });
    };
    return OpenFileCommand;
};

pluginExtension.commands.SaveFileCommand = function () {
    function SaveFileCommand(id) {
        this.id = id;
    }
    SaveFileCommand.prototype = commandFramework.command().prototype;
    SaveFileCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The save file has been clicked.';
            resolve();
        });
    };
    return SaveFileCommand;
};

pluginExtension.commands.UndoEditCommand = function () {
    function UndoEditCommand(id) {
        this.id = id;
    }
    UndoEditCommand.prototype = commandFramework.command().prototype;
    UndoEditCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The undo edit has been clicked.';
            resolve();
        });
    };
    return UndoEditCommand;
};

pluginExtension.commands.RedoEditCommand = function () {
    function RedoEditCommand(id) {
        this.id = id;
    }
    RedoEditCommand.prototype = commandFramework.command().prototype;
    RedoEditCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The redo edit has been clicked.';
            resolve();
        });
    };
    return RedoEditCommand;
};

pluginExtension.commands.DeleteEditCommand = function () {
    function DeleteEditCommand(id) {
        this.id = id;
    }
    DeleteEditCommand.prototype = commandFramework.command().prototype;
    DeleteEditCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The delete edit has been clicked.';
            document.getElementById('editor').value = '';
            resolve();
        });
    };
    return DeleteEditCommand;
};

pluginExtension.commands.CommandListHelpCommand = function () {
    function CommandListHelpCommand(id) {
        this.id = id;
    }
    CommandListHelpCommand.prototype = commandFramework.command().prototype;
    CommandListHelpCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The command list has been clicked.';
            resolve();
        });
    };
    return CommandListHelpCommand;
};

pluginExtension.commands.AboutHelpCommand = function () {
    function AboutHelpCommand(id) {
        this.id = id;
    }
    AboutHelpCommand.prototype = commandFramework.command().prototype;
    AboutHelpCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The about has been clicked.';
            resolve();
        });
    };
    return AboutHelpCommand;
};

pluginExtension.commands.LineIndentCommand = function () {
    function LineIndentCommand(id) {
        this.id = id;
    }
    LineIndentCommand.prototype = commandFramework.command().prototype;
    LineIndentCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The indent has been clicked.';
            resolve();
        });
    };
    return LineIndentCommand;
};

pluginExtension.commands.LineDedentCommand = function () {
    function LineDedentCommand(id) {
        this.id = id;
    }
    LineDedentCommand.prototype = commandFramework.command().prototype;
    LineDedentCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The dedent has been clicked.';
            resolve();
        });
    };
    return LineDedentCommand;
};

pluginExtension.commands.SourceFoldCommand = function () {
    function SourceFoldCommand(id) {
        this.id = id;
    }
    SourceFoldCommand.prototype = commandFramework.command().prototype;
    SourceFoldCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The fold has been clicked.';
            resolve();
        });
    };
    return SourceFoldCommand;
};

pluginExtension.commands.SourceBeautifyAllCommand = function () {
    function SourceBeautifulAllCommand(id) {
        this.id = id;
    }
    SourceBeautifulAllCommand.prototype = commandFramework.command().prototype;
    SourceBeautifulAllCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The beautiful all has been clicked.';
            resolve();
        });
    };
    return SourceBeautifulAllCommand;
};

pluginExtension.commands.EditorFocusoutCommand = function () {
    function EditorFocusoutCommand(id) {
        this.id = id;
    }
    EditorFocusoutCommand.prototype = commandFramework.command().prototype;
    EditorFocusoutCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The editor has not been focused.';
            //document.getElementById('help').children[0].style.display = 'block';
            resolve();
        });
    };
    return EditorFocusoutCommand;
};

pluginExtension.commands.EditorFocusedCommand = function () {
    function EditorFocusedCommand(id) {
        this.id = id;
    }
    EditorFocusedCommand.prototype = commandFramework.command().prototype;
    EditorFocusedCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The editor has been clicked.';
            //document.getElementById('help').children[0].style.display = 'none';
            resolve();
        });
    };
    return EditorFocusedCommand;
};

pluginExtension.commands.DynamicMenuCommand = function () {
    function DynamicMenuCommand(id) {
        this.id = id;
    }
    DynamicMenuCommand.prototype = commandFramework.command().prototype;
    DynamicMenuCommand.prototype.execute = function() {
        return new Promise(function (resolve) {
            document.getElementById('info').innerHTML = 'The menu has been changed.';
            commandFramework.service.updateTopMenu();
            resolve();
        });
    };
    return DynamicMenuCommand;
};
