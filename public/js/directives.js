angular.module('sharebox.system').directive('jmDpRefreshView',function() {
    var noop = function(){};
    var refreshDpOnNotify = function (dpCtrl) {
        return function() {
            dpCtrl.refreshView();
        };
    };
    return {
        require: 'datepicker',
        link: function(scope,elem,attrs,dpCtrl) {
            var refreshPromise = scope[attrs.jmDpRefreshView];
            refreshPromise.then(noop,noop,refreshDpOnNotify(dpCtrl));
        }
    };
});