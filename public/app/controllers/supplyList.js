/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('SupplyList', SupplyList);

    SupplyList.$inject = ['applicationData', 'firebaseDataService', '$q', '$scope'];

    function SupplyList(applicationData, firebaseDataService, $q, $scope) {
        var vm = this;
        vm.addItem = addItem;
        vm.date = new Date();
        vm.items = [];
        vm.location = "";
        vm.removeItem = removeItem;
        vm.save = save;
        vm.search = "";
        vm.storageAreas = [];
        vm.usedSupplies = [];

        activate();

        function activate() {
            // pull from server inventory, storage areas
        }

        function addItem(itemID) {
            var item = vm.items[itemID];
            if(item.quantity <= 0) {
                return;
            }
            item.quantity--;

            var usedSupply =  _.findWhere(vm.usedSupplies, {itemID: itemID});
            if(_.isUndefined(usedSupply)) {
                vm.usedSupplies.push({
                    itemID: itemID,
                    quantity: 1
                });
                vm.usedSupplies = _.sortBy(vm.usedSupplies, function(item) { return vm.items[itemID].name; });
            } else {
                usedSupply.quantity++;
            }
        }

        function removeItem(usedSupplyItemID) {
            var usedItem = _.findWhere(vm.usedSupplies, {itemID: usedSupplyItemID});
            usedItem.quantity--;
            if(usedItem.quantity == 0) {
                vm.usedSupplies = _.without(vm.usedSupplies, usedItem);
            }
            vm.items[usedSupplyItemID].quantity++;
        }

        function save() {
            if(_.isEmpty(vm.usedSupplies)) {
                return;
            }

            var historyList = {
                date: vm.date.toString(),
                itemList: angular.copy(vm.usedSupplies),
                location: vm.location,
                userID: applicationData.user.userID
            };

            var promises = [firebaseDataService.pushHistoryList(historyList)];

            _.each(vm.usedSupplies, function(item) {
                promises.push(firebaseDataService.setItem(item.itemID, angular.copy(vm.items[item.itemID])));
            });

            $q.all(promises).then(function(data) {
                applicationData.historyLists[data[0]] = historyList;
                vm.date = new Date();
                vm.location = "";
                vm.usedSupplies = [];
                vm.search = "";
            });
        }

        $scope.$watch(function() { return applicationData.serviceInitialized; }, function(initialized) {
            if(!initialized) {
                return;
            }
            vm.items = applicationData.items;
            vm.storageAreas = applicationData.storageAreas;
        });
    }
})();