/**
 * This module is a part navigator.
 *
 * @since 2017. 02. 27.
 * @author Minsung JIN <minsung.jin@samsung.com>
 */

define([
    './main-part',
    'app/constants',
    'jquery',
    'lodash'
], function(
    MainPart,
    constants,
    $,
    _
) {
    'use strict';

    var ID_MAIN_PAGE = 'main-page';
    var ID_MAIN_PART_TEMPLATE = 'main-part-template';

    var LEFT_KEY_CODE = '37';
    var RIGHT_KEY_CODE = '39';
    var UP_KEY_CODE = '38';
    var DOWN_KEY_CODE = '40';

    var mainPart;
    var pageParts = [constants.ID_WEB_PAGE_PART, constants.ID_BLOG_PART];

    /**
     * Initializes.
     */
    function init() {
        var webPageElement = document.createElement('div');
        webPageElement.setAttribute('id', pageParts[0]);
        $(webPageElement).load('templates/web-page.html');

        mainPart = new MainPart().init(ID_MAIN_PAGE, webPageElement);
        mainPart.setContent();
        mainPart.hide();
    }

    /**
     * Sets a hash corresponding part and sub part.
     *
     * @param {string} part A hash of part.
     * @param {string} subPart A hash of sub part.
     */
    function navigate(part, subPart) {
        var hash = '';

        if (part) {
            hash = part;

            if (subPart) {
                hash += '/' + subPart;
            }
        }

        window.location.hash = hash;
    }

    /**
     * Parses hash string.
     *
     * @returns {object} An object has part and subPart properties.
     */
    function parseCurrentHash() {
        var hashes = [];

        if (window.location.hash) {
            hashes = window.location.hash.substr(1).split('/');
        }

        return {
            part: hashes[0],
            subPart: hashes[1]
        };
    }

    /**
     * Activates navbar corresponding part and sub part.
     *
     * @param {object} hash A hash object.
     * @param {string} hash.part A hash of part.
     * @param {string} hash.subPart A hash of sub part.
     */
    function activateNavbar(hash) {
        var hashPart = hash.part;
        if (!hashPart) {
            return;
        }

        var navbar = document.querySelector('#' + hashPart);
        $(navbar).addClass(CLASS_ACTIVE);

        if (_.includes(businessDepartmentParts, hashPart)) {
            var subNavbar = document.querySelector('#' + constants.ID_WEB_PAGE_PART);
            $(subNavbar).addClass(CLASS_ACTIVE);
        }
    }

    /**
     * Refreshes part and navbar.
     */
    function refresh() {
        if (!mainPart) {
            return;
        }

        mainPart.show();

        var hash = parseCurrentHash();

        var hashPart = hash.part;
        if (hashPart) {
            mainPart.showSubPart(hashPart);

            activateNavbar(hash);

        }
    };

    $(document).keydown(function (event) {
        event = event || window.event;
        var hash = parseCurrentHash();
        var part = hash.part;
        if (!part) {
            return;
        }

        var departmentPart = mainPart.getSubPart(part);
        if (!departmentPart) {
            return;
        }

        var keyCode = event.keyCode;
        if (keyCode == LEFT_KEY_CODE || keyCode == UP_KEY_CODE) {
        } else if (keyCode == RIGHT_KEY_CODE || keyCode == DOWN_KEY_CODE) {
        }
    });

    $(window).on('hashchange', function () {
        refresh();
    });

    return {
        init: init,
        navigate: navigate,
        refresh: refresh
    };
});
