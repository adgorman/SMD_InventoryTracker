/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('History', History);

    History.$inject = ['applicationData', 'firebaseDataService', '$q', '$scope'];

    function History(applicationData, firebaseDataService, $q, $scope) {
        var vm = this;
        vm.items = applicationData.items;
        vm.logList = [];
        vm.removeList = removeList;

        activate();

        function activate() {
        }

        function removeList(log) {
            firebaseDataService.deleteHistoryList(log.$key);
            delete applicationData.historyLists[log.$key];
        }

        $scope.$watch(function() { return applicationData.serviceInitialized; }, function(initialized) {
            if(!initialized) {
                return;
            }
            vm.items = applicationData.items;
        });

        $scope.$watchCollection(function() { return applicationData.historyLists; }, function(historyLists) {
            vm.logList = formatLogList(historyLists);
        });

        $scope.$watch(function() { return applicationData.user; }, function(user) {
            if(_.isNull(user)) {
                return;
            }
            vm.logList = formatLogList(applicationData.historyLists);
        });

        function formatLogList(logList) {
            if(_.isNull(applicationData.user)) {
                return null;
            }

            var formattedLogList = _.mapObject(logList, function(log) {
                var date = new Date(log.date);
                log.dateString = moment(date).format('M/D/YY');
                log.dateTime = date.getTime();
                log.price = getPriceOfList(log.itemList);
                return log;
            });
            formattedLogList = _.pick(formattedLogList, function(log) {
                return log.userID == applicationData.user.userID;
            });

            return formattedLogList;
        }

        function getPriceOfList(itemList) {
            var price = 0;

            _.each(itemList, function(item) {
                if(!_.isUndefined(vm.items[item.itemID])) {
                    price += item.quantity * vm.items[item.itemID].price;
                }
            });

            return price;
        }
    }
})();