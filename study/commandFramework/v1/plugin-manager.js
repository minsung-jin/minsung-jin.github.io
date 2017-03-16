define([
	'text!configs/plugin-settings.json'
], function(pluginSettingsText) {
    'use strict';

    var pluginSettings = JSON.parse(pluginSettingsText);

    // owenr and contributor is instance of Plugin
    function ExtensionPoint(owner, id) {
        this.owner = owner;
        this.id = id;
        this.manifest = owner.manifest.extensionPoints[id];
        this.contributors = [];
    }
    ExtensionPoint.registry = {};


    // hey, any better name? PluginRegistryItem? PluginManipulator?
    function Plugin(id, basePath) {
        this.id = id;
        this.basePath = basePath;
        this.module = null;
        this.manifest = null;   // basePath + '/plugin.json'
        this.extensionPoints = [];
    }

    // we may need a b+ tree to have 'real' registry impl.
    // at least, we should have to search 'range' of registry keys.
    // for example, registry.searchLike("webida.platform.%")
    Plugin.registry = {};

    Plugin.prototype = {
        register: function() {
            Plugin.registry[this.id] = this;
        },

        loadManifest : function loadManifest() {
            var manifestPath = 'text!' + this.basePath + '/plugin.json';
            var that = this;
            return new Promise( function(resolve) {
                // if plugin has no manifest, or invalid manifest
                // then should be unregistered
                require([manifestPath], function(text) {
                    console.log('parsing ' + manifestPath);
                    that.manifest = JSON.parse(text);
                    that.createExtensionPoints();
                    resolve (that.manifest);
                });
            });
        },

        loadModule : function _loadModule() {
            var that = this;
            return new Promise( function(resolve) {
                var modulePath = that.getLoadablePath('plugin');
                require([modulePath], function(loaded) {
                    that.module = loaded;
                    resolve (that.module);
                });
            });
        },

        getExtensionFor : function(extensionPointId) {
            var ret;
            if (typeof(this.manifest.extensions)  === 'object') {
                ret = this.manifest.extensions[extensionPointId];
            }
            return ret;
        },

        createExtensionPoints : function() {
            var that = this;
            if (typeof(this.manifest.extensionPoints) === 'object') {
                that.extensionPoints = Object.keys(this.manifest.extensionPoints).map(function(xpid) {
                    return new ExtensionPoint(that, xpid);
                });
                that.extensionPoints.forEach(function(xp) {
                    ExtensionPoint.registry[xp.id] = xp;
                });
            }
        },

        getLoadablePath : function(subResourcePath) {
            return this.basePath + '/' + subResourcePath;
        }
    };

    function PluginManager(catalog) {
        this.catalog = catalog;
        var pluginIds = Object.keys(catalog.plugins);
        console.log("catalog has plugins " ,  catalog.plugins);
        pluginIds.forEach( function(pluginId) {
            var plugin = new Plugin(pluginId, catalog.plugins[pluginId]);
            Plugin.registry[pluginId] = plugin;
        });
    }

    PluginManager.prototype = {
        _allPluginIds : function() { return Object.keys( Plugin.registry ); },
        _allPlugins : function () {
            return this._allPluginIds().map( function(id) {
                return Plugin.registry[id];
            });
        },

        init : function init() {
            // check catalog data first
            var that = this;
            return new Promise(function (resolve, reject) {
                that._loadManifests()
                    .then(function() {
                        console.log('registry after loading manifests', Plugin.registry);
                        that._collectExtensions();
                    })
                    .then(function() {
                        console.log('registry after collecting extensions', Plugin.registry);
                        resolve();
                    })
                    .catch(function(e) {
                        console.error('pm init failed', e);
                        reject(e);
                    });
            });
        },

        getPlugin : function getPlugin(pluginId) {
            return Plugin.registry[pluginId];
        },

        getExtensionPoint : function getgetExtensionPoint(xpid) {
            return ExtensionPoint.registry[xpid];
        },

        _loadManifests : function() {
            var promises = this._allPlugins().map(function(plugin) {
                return plugin.loadManifest();
            });
            return Promise.all(promises);
        },

        _collectExtensions : function() {
            var that = this;
            var extensionPointIds =
            this._allPlugins().forEach( function(plugin) {
                var extensions = plugin.manifest.extensions;
                if (typeof(extensions) === 'object') {
                    Object.keys(extensions).forEach( function(contributingTo) {
                        ExtensionPoint.registry[contributingTo].contributors.push(plugin);
                    });
                }
            });
        }
    };

    return new PluginManager(pluginSettings);
});