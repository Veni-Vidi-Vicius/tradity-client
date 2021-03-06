/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
(function() { 'use strict';

angular.module('tradity').
  directive('stock', function($compile,stock) {
    function link(scope, element, attrs) {
      scope.onOpen = function() {
        scope.$broadcast('visible-popover');
      };
    }
    
    return {
      link: link,
      template: '<a ns-popover ns-popover-timeout="0.5" ' +
        'ns-popover-template="app/templates/popover.stock.html" ' +
        'ns-popover-trigger="mouseenter" ' +
        'ns-popover-on-open="onOpen()" ' +
        'title="{{stockinfo.stocktextid}}" ' +
        'ui-sref="game.tradesellbuy({sellbuy: \'buy\', stockId: stockinfo.stocktextid, amount: 0})"> ' +
        '{{stockinfo.stockname}}</a>',
      scope:{
        stockinfo: '='
      }
    };
  });

})();
