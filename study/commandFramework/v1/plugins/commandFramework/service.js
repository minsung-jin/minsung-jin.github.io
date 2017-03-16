var commandFramework = commandFramework || {};
/**
 * Service is interface for extension plugins.
 */
commandFramework.service = (function () {

    var menuView = commandFramework.menuView;
    var menuModel = commandFramework.menuModel;

    function loadScript(url, cb) {
        var script = doc.createElement('script');
        script.src = url;
        script.onload = cb;
        doc.getElementsByTagName('head')[0].appendChild(script);
    }

    function loadJson(url, cb) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
        xobj.open('GET', url, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status =="200") {
                cb(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function collectExtensions(cb) {
        loadJson('json/command.json', function (str) {
            commandFramework.registry.setCommandRegistry(JSON.parse(str));

            loadJson('json/menu-file.json', function (str) {
                menuModel.createMenuItem(JSON.parse(str));

                loadJson('json/menu-edit.json', function (str) {
                    menuModel.createMenuItem(JSON.parse(str));

                    loadJson('json/menu-help.json', function (str) {
                        menuModel.createMenuItem(JSON.parse(str));
                        cb();
                    });
                });
            });
        });
    }

    function createTopMenu() { 
        menuView.createTopMenuElement();
    }

    function createContextMenu() { 
        menuView.createContextMenuElement();
    }

    function requestExecution(id) {
        var command = commandFramework.factory.createCommand(id);
        if (command && command.canExecute()) {
            commandFramework.store.execute(command);
        }
    }

    function getTopMenuItem(id) {
        return menuModel.getTopMenuItem(id);
    }

    function getContextMenuItem(id) {
        return menuModel.getContextMenuItem(id);
    }

    function createPromiseForTopMenuModel(obj) {
        return new Promise(function (resolve) {
                var value = obj.updateTopMenu();
                resolve(value);
        }); 
    }

    function selectModuleForTopMenuModel (module) {
        var promise = [];
        for (var ext in pluginExtension) {
            if (pluginExtension.hasOwnProperty(ext) && module === ext) {
                if (typeof pluginExtension[ext].updateTopMenu === 'function') {
                    promise.push(createPromiseForTopMenuModel(pluginExtension[ext]));
                }
            }
        }
        return promise;
    }

    function updateTopMenu(modules, cb) {
        var res = [];
        modules.forEach(function(module) {
            var name = module.split('-')[0];
            res = res.concat(selectModuleForTopMenuModel(name));
        });
        Promise.all(res).then(function(value) {
           menuView.updateTopMenuElement(value);
            cb();
        }, function(reason) {
            console.log(reason);
        });
    }

    return {
        collectExtensions: collectExtensions,
        createTopMenu: createTopMenu,
        createContextMenu: createContextMenu,
        requestExecution: requestExecution,
        getTopMenuItem: getTopMenuItem,
        getContextMenuItem: getContextMenuItem,
        updateTopMenu: updateTopMenu
    };
})();
