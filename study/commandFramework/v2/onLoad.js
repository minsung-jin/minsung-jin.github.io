var commandFramework = commandFramework || {};

function createTextbox() {
    var p = document.createElement('p');
    p.setAttribute('style', 'margin: 30px;');
    var textbox = document.createElement('div');
    textbox.setAttribute('id', 'info');
    textbox.setAttribute('class', 'textbox');
    textbox.textContent = 'Information';
    var div = document.createElement('div');
    div.setAttribute('id', 'notification');
    div.appendChild(p);
    div.appendChild(textbox);
    div.addEventListener('click', function (e) {
        commandFramework.context.setCurrentFocus('other');
        commandFramework.service.requestExecution(e.target.dataset.commandId);
    });
    document.body.appendChild(div);
}

function createTextarea() {
    var p = document.createElement('p');
    var textarea = document.createElement('textarea');
    textarea.appendChild(p);
    textarea.setAttribute('id', 'editor');
    textarea.setAttribute('data-command-id', 'editor-focused');
    textarea.setAttribute('class', 'textarea');
    textarea.addEventListener('click', function (e) {
        commandFramework.context.setCurrentFocus('editor');
        commandFramework.service.requestExecution(e.target.dataset.commandId);
    });
    document.body.appendChild(textarea);
}

function addShortEventListener() {
    document.addEventListener('keydown', function(e) {
        commandFramework.shortcut.shortcutEventListener(e);
    });
}

window.onload = function () {
    createTextbox();
    createTextarea();
    commandFramework.service.collectExtensions(function () {
        commandFramework.service.createTopMenu();
        commandFramework.service.createContextMenu();
        addShortEventListener();
    });
};
