require.config({
	paths : {
		app : '.',
		top : '',
		graphite : '../../src',
		external : 'external',
        text : 'external/requirejs/text'
	},
	urlArgs : "i="+(new Date()).getTime().toString().substr(10)+'B'
});