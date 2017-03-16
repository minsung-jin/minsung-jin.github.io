var commandFramework = commandFramework || {};
commandFramework.shortcut = (function() {
    var keyCode = commandFramework.keyCode;
    var keyToCodeMap = keyCode.keyToCodeMap;
    var codeToKeyMap = keyCode.codeToKeyMap;
    var modifierKeyCodes = [ keyToCodeMap.Shift, keyToCodeMap.Ctrl, keyToCodeMap.Alt ];
    var modKeyStr = ['SHIFT', 'META', 'CTRL', 'ALT'];

    function normalizeKeysStr(str) {
        if (!str) { return null; }
        var arr = str.split('+');
        var len = arr.length;
        if (len < 1) { return null; }
        arr = arr.map(function (elmt) { return elmt.trim(); });
        var last = arr[len - 1];
        if (last.length === 1) { last = last.toUpperCase(); }
        if (!keyToCodeMap[last]) { return null; }
        arr = arr.slice(0, -1).map(function (elmt) { return elmt.toUpperCase(); }).sort();
        if (arr.every(function (elmt) { return modKeyStr.indexOf(elmt) > -1; })) {
            var arr2 = [];
            if (arr.indexOf('CTRL') > -1) { arr2.push('Ctrl'); }
            if (arr.indexOf('SHIFT') > -1) { arr2.push('Shift'); }
            if (arr.indexOf('ALT') > -1) { arr2.push('Alt'); }
            if (arr.indexOf('META') > -1) { arr2.push('Meta'); }
            arr2.push(last);
            return arr2.join('+');
        } else {
            return null;
        }
    }

    function shortcutEventListener(event) {
        if (modifierKeyCodes.indexOf(event.keyCode) > -1) {
            return;
        }
        var mainKey = codeToKeyMap[event.keyCode];
        if (!mainKey) {
            return;
        }
        var keys = [];
        if (event.shiftKey) { keys.push('shift'); }
        if (event.metaKey) { keys.push('meta'); }
        if (event.ctrlKey) { keys.push('ctrl'); }
        if (event.altKey) { keys.push('alt'); }
        keys.push(mainKey);
        keys = keys.join('+');
        console.log('keys: ', keys);
        var shortcutItem = commandFramework.registry.getShortcutRegistry(keys);
        if (shortcutItem) {
            if (!shortcutItem.keepDefault) {
                event.preventDefault();
            }
            if (!shortcutItem.propagate) {
                event.stopPropagation();
            }
            commandFramework.service.requestExecution(shortcutItem.commandId);
        }
    }

    return {
        shortcutEventListener: shortcutEventListener
    };
})();