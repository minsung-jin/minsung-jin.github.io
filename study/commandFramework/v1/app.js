require([
	'plugin-manager'
], function(pm) {
	//plugin registry

    pm.init().then( function() {
        console.log("plugin manager initialized!");
        console.log("begin loading plugins");
        require([
            'plugins/webida.platform.workbench/plugin.js',
            'plugins/webida.platform.command-system/plugin.js',
            'plugins/webida.ide.workspace.view/plugin.js',
            'plugins/webida.ide.editor.text-editor/plugin.js'
        ], function(){
            console.log("loaded all plugins", arguments);
        });

    });

});