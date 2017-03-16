require([
	'plugins/webida.ide.editor.text-editor/meta.js',
	'plugins/webida.ide.workspace.view/meta.js',
	'plugins/webida.platform.command-system/meta.js',
	'plugins/webida.platform.workbench/meta.js'
], function(meta1, meta2, meta3, meta4) {
	//plugin registry

	require([
		'plugins/webida.platform.workbench/plugin.js',
		'plugins/webida.platform.command-system/plugin.js',
		'plugins/webida.ide.workspace.view/plugin.js',
		'plugins/webida.ide.editor.text-editor/plugin.js'
	], function(){

	});
});