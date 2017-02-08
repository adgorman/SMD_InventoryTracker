/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('History', History);

    History.$inject = ['applicationData', 'firebaseDataService', '$scope'];

    function History(applicationData, firebaseDataService, $scope) {
        var vm = this;
        vm.items = applicationData.items;
        vm.logList = [];

        activate();

        function activate() {
        }

        $scope.$watch(function() { return applicationData.serviceInitialized; }, function(initialized) {
            if(!initialized) {
                return;
            }
            vm.items = applicationData.items;
        });

        $scope.$watch(function() { return applicationData.historyLists; }, function(historyLists) {
            vm.logList = applicationData.historyLists;
            formatLogList(vm.logList);
            function formatLogList(logList) {
                logList = _.mapObject(logList, function(log) {
                    var date = new Date(log.date);
                    log.dateString = moment(date).format('M/D/YY');
                    log.dateTime = date.getTime();
                    return log;
                });
            }
        });
    }
})();