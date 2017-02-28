/**
 * This module is a base part.
 *
 * @since 2017. 02. 27.
 * @author Minsung Jin <minsung.jin@samsung.com>
 */

define([
    'jquery',
    'lodash'
], function(
    $,
    _
) {
    'use strict';

    var CLASS_HIDE = 'minsung-hide';
    var CLASS_SHOW = 'minsung-show';

    /**
     * A base part.
     *
     * @class BasePart
     */
    function BasePart() {
    }

    /**
     * Initializes.
     *
     * @param {string} id An ID of part.
     * @param {object} element A DOM Element of part.
     * @param {object} option An option of part.
     * @param {string} option.className A name of CSS class to add.
     * @returns {object} An instance base part.
     */
    BasePart.prototype.init = function (id, element, option) {
        this.id = id;
        this.element = element;
        this.content = null;
        this.subParts = [];
        this.option = option || {};

        var className = this.option.className;
        if (className) {
            $(element).addClass(className);
        }

        return this;
    };

    /**
     * Gets a DOM element of part.
     *
     * @returns {object} A DOM Element.
     */
    BasePart.prototype.getElement = function () {
        return this.element;
    };

    /**
     * Gets a content of part.
     *
     * @returns {object} A content.
     */
    BasePart.prototype.getContent = function () {
        return this.content;
    };

    /**
     * Sets a content of part.
     *
     * @param {object} content A content.
     */
    BasePart.prototype.setContent = function (content) {
        if (this.content === content) {
            return;
        }

        this.content = content;

        if (this.isVisible()) {
            this.redraw();
        }

        // _.each(this.subParts, function (subPart) {
        //     subPart.setContent(content);
        // });
    };

    /**
     * Gets an option of part.
     *
     * @returns {object} An option.
     */
    BasePart.prototype.getOption = function () {
        return this.option;
    };

    /**
     * Adds sub part.
     *
     * @param {object} Part A class of sub part.
     * @param {string} id An ID of part.
     * @param {object} option An option of part.
     * @param {string} option.className A name of CSS class to add.
     * @returns {object} An instance of sub part.
     */
    BasePart.prototype.addSubPart = function (Part, id, option) {
        var partElement = document.createElement('div');

        var part = new Part().init(id, partElement, option);
        this.subParts.push(part);

        part.parentPart = this;

        this.element.appendChild(partElement);

        return part;
    };

    /**
     * Gets sub part corresponding ID of part.
     *
     * @param {string} id An ID of part.
     * @returns {object} A sub part.
     */
    BasePart.prototype.getSubPart = function (id) {
        return _.find(this.subParts, {
            id: id
        });
    };

    /**
     * Redraws part.
     */
    BasePart.prototype.redraw = function () {
    };

    /**
     * Shows part.
     */
    BasePart.prototype.show = function () {
        if (this.content) {
            this.redraw();
        }

        $(this.element).removeClass(CLASS_HIDE);
        $(this.element).addClass(CLASS_SHOW);
    };

    /**
     * Hides part.
     */
    BasePart.prototype.hide = function () {
        $(this.element).removeClass(CLASS_SHOW);
        $(this.element).addClass(CLASS_HIDE);
    };

    /**
     * Shows sub part corresponding ID of part.
     *
     * @param {string} id An ID of part.
     * @returns {object} An instance of sub part.
     */
    BasePart.prototype.showSubPart = function (id) {
        var singlePart = null;

        _.each(this.subParts, function (subPart) {
            if (subPart.id === id) {
                singlePart = subPart;
                subPart.show();
            } else {
                subPart.hide();
            }
        });

        return singlePart;
    };

    /**
     * Shows all sub parts.
     */
    BasePart.prototype.showAllSubPart = function () {
        _.each(this.subParts, function (subPart) {
            subPart.show();
        });
    };

    /**
     * Checks whether part is visible.
     *
     * @returns {boolean} Whether part is visible.
     */
    BasePart.prototype.isVisible = function () {
        return $(this.element).hasClass(CLASS_SHOW);
    };

    return BasePart;
});

