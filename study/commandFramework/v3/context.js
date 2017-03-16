var commandFramework = commandFramework || {};
commandFramework.context = (function () {
    var focus = {
        currentFocus: 'other',
        oldFocus: 'other'
    };

    function getCurrentFocus() {
        return focus.currentFocus;
    }

    function setCurrentFocus(str) {
        if (focus.currentFocus === str) {
            return;
        } else {
            focus.oldFocus = focus.currentFocus;
            focus.currentFocus = str;
        }
    }

    return {
        getCurrentFocus: getCurrentFocus,
        setCurrentFocus: setCurrentFocus
    };
})();