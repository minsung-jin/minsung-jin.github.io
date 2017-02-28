
/**
 * This module is an main page.
 *
 * @since 2017. 2. 15
 * @author minsung jin <minsung.jin@samsung.com>
 */

 define ([
   'jquery',
   'lodash',
   'moment',
   './part/part-navigator'
 ], function (
   $,
   _,
   moment,
   partNavigator
 ) {
  'use strict';

  var HOME_PATH = '/dev/index.html';
  var ID_INTRO_PAGE = 'intro-page';

  function getToday() {
    moment.locale('ko');

    return moment().format('YYYY. M. D (dd)');
  }

  $(function() {
    if (window.location.pathname !== HOME_PATH || window.location.hash !== '') {
      window.location.herf = window.location.origin + HOME_PATH;
      return;
    }

/*
    var $intropageelement = document.queryselector('#' + id_intro_page);
    var dateElement = document.createelement("span");
    dateElement.textcontent = gettoday();

    $intropageelement.appendchild(dateElement);*/

    partNavigator.init();
  });

});

