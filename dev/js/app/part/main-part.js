/**
 * This module is a main part.
 *
 * @since 2017. 02. 27.
 * @author Minsung Jin <minsung.jin@samsung.com>
 */

define([
    './base-part',
    'app/constants',
    'app/utils/genetic',
    'lodash'
], function(
    BasePart,
    constants,
    genetic,
    _
) {
    'use strict';

    /**
     * A main part.
     *
     * @class MainPart
     */
    function MainPart() {
        BasePart.apply(this, arguments);
    }

    genetic.inherit(MainPart, BasePart, {
        /**
         * Initializes.
         *
         * @override
         * @param {string} id An ID of part.
         * @param {object} element A DOM Element of part.
         * @param {object} option An option of part.
         * @param {array} option.templateIds An array containing ID of template of sub part.
         * @returns {object} An instance part.
         */
        init: function (id, element, option) {
            BasePart.prototype.init.call(this, id, element, option);

            var self = this;

            $('#' + id).empty();
            $('#' + id).append(element);

            return this;
        },

        /**
         * Redraws part.
         *
         * @override
         */
        redraw: function () {
            var self = this;
            var content = this.content;
            if (!content) {
                return;
            }
        }
    });

    return MainPart;
});
