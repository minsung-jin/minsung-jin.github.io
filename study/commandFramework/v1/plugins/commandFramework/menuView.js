var commandFramework = commandFramework || {};
/**
 * This file is create the html element for menus.
 */
commandFramework.menuView = (function() {

    var menuModel = commandFramework.menuModel;
    var menuFactory = commandFramework.menuFactory;

    function createMenuItemElement(item) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.textContent = item.name;
        a.setAttribute('href', '#');
        a.setAttribute('id', item.id);
        a.setAttribute('data-command-id', item.commandId);
        a.setAttribute('data-location', item.location);
        a.setAttribute('data-disabled', item.disabled);
        if (item.disabled === 'true') {
            a.setAttribute('style', 'color:gray;');
        }
        li.setAttribute('id', item.id);
        li.appendChild(a);
        if (item.hasChildren()) {
            var childUl = createMenuElement(item);
            li.appendChild(childUl);
        }
        return li;
    }

    function createMenuElement(menu) {
        var ul = document.createElement('ul');
        ul.setAttribute('display', 'none');
        menu.children.forEach(function(child) {
            var li = createMenuItemElement(child);
            ul.appendChild(li);
        });
        return ul;
    }

    function createTopMenuElement() {
        var item = menuFactory.createTopMenuItem();
        var element = createMenuElement(item);
        appendTopMenuElement(element);
    }

    function createContextMenuElement() {
        var item = menuFactory.createContextMenuItem();
        var element = createMenuElement(item);
        appendContextMenuElement(element);
    }

    function changeHoverSytle(value) {
        var ulElementChildNode = Array.prototype.slice.call(document.querySelectorAll('ul'));
        ulElementChildNode.forEach(function(item) {
            item.setAttribute('display', value);
        });
    }

    function getModulesForMenuItems(id) {
        var modules = [];
        var item = menuModel.getTopMenuItem(id);
        item.items.forEach(function(child) {
            modules.push(child.module);
        });
        modules.push(item.module);
        return modules.reduce(function(a,b) {
            if (a.indexOf(b) < 0) {
                a.push(b);
            }
            return a;
            }, []);
    }

    function appendTopMenuElement(menuElement) {
        var enterMouse = false;
        var div = document.createElement('div');
        div.setAttribute('class', 'menu');
        div.setAttribute('id', 'top-menu');
        div.appendChild(menuElement);
        div.addEventListener('click', function (e) {
            if (e.target.dataset.disabled !== 'true') {
                if (e.target.dataset.location === '/') {
                    commandFramework.service.updateTopMenu(
                        getModulesForMenuItems(e.target.id), function() {
                        changeHoverSytle('block');
                    });
                } else {
                    commandFramework.service.requestExecution(e.target.dataset.commandId);
                    changeHoverSytle('none');
                }
            }
            commandFramework.context.setCurrentFocus('menu');
        });
        div.addEventListener('mouseenter', function() {
            enterMouse = true;
        });
        div.addEventListener('mouseleave', function() {
            enterMouse = false;
            changeHoverSytle('none');
        });
        div.addEventListener('focusout', function(e) {
            if (!enterMouse) {
                changeHoverSytle('none');
            }
        });
        document.body.insertBefore(div, document.getElementById('editor'));
    }

    function appendContextMenuElement(menuElement) {
        var div = document.createElement('div');
        div.setAttribute('class', 'contextMenu');
        div.setAttribute('id', 'context-menu');
        div.appendChild(menuElement);
        div.addEventListener('click', function (e) {
            commandFramework.service.requestExecution(e.target.dataset.commandId);
        });
        document.body.appendChild(div);
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            div.style.display = 'block';
            div.style.left = (e.pageX - 20) + 'px';
            div.style.top = (e.pageY - 20) + 'px';
        });
        document.addEventListener('click', function() {
            div.style.display = 'none';
            div.style.left = '';
            div.style.top = '';
        });
    }

    function updateTopMenuElement(resource) {
        var ids = [];
        resource.forEach(function(arry) {
            if (arry) {
                ids = ids.concat(arry);
            }
        });
        ids.forEach(function(id) {
            var item, node;
            var menuItem = menuFactory.createTopMenuItem(id);
            if (menuItem.children.length > 0) {
                item = createMenuElement(menuItem);
                node = document.getElementById(id).children[1];
                node.parentNode.replaceChild(item, node);
            } else {
                item = createMenuItemElement(menuItem);
                node = document.getElementById(id);
                node.parentNode.replaceChild(item, node);
            }
        });
    }

    function refreshTopMenuElement() {
        var topMenu = document.getElementById('top-menu');
        var item = menuFactory.createTopMenuItem();
        var menuElement = createMenuElement(tree);
        topMenu.removeChild(topMenu.children[0]);
        topMenu.appendChild(menuElement);
    }

    return {
        createMenuElement: createMenuElement,
        createTopMenuElement: createTopMenuElement,
        createContextMenuElement: createContextMenuElement,
        appendTopMenuElement: appendTopMenuElement,
        appendContextMenuElement: appendContextMenuElement,
        updateTopMenuElement: updateTopMenuElement,
        refreshTopMenuElement: refreshTopMenuElement
    };
})();