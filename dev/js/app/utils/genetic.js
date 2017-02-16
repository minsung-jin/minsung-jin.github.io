
/**
 * This module is an inheritance util.
 *
 * @since 2017. 2. 16.
 * @author minsung jin <minsung.jin@samsung.com>
 */

define(function() {
    'use strict';

    /**
     * Inherits prototype properties from parent and add new prototypes.
     *
     * @param {object} child A child object.
     * @param {object} parent A parent object.
     * @param {object} props The properties.
     */
    function inherit(child, parent, properties) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        if (typeof properties === 'object') {
            Object.keys(properties).forEach(function(key) {
                if (key !== 'constructor') {
                    child.prototype[key] = properties[key];
                }
            });
        }
    }

    return {
        inherit: inherit
    };
});
