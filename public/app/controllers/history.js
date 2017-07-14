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
            var promises = [firebaseDataService.deleteHistoryList(log.$key)];
            _.each(log.itemList, function(item) {
                var updatedItem = {
                    name: vm.items[item.itemID].name,
                    quantity: vm.items[item.itemID].quantity + item.quantity,
                    storageAreaID: vm.items[item.itemID].storageAreaID
                };
                promises.push(firebaseDataService.setItem(item.itemID, updatedItem).then(function() {
                    applicationData.items[item.itemID].quantity = updatedItem.quantity;
                }));
            });

            $q.all(promises).then(function () {
                delete applicationData.historyLists[log.$key];
            });
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
                return log;
            });
            formattedLogList = _.pick(formattedLogList, function(log) {
                return log.userID == applicationData.user.userID;
            });

            return formattedLogList;
        }
    }
})();