/**
 * Created by Adam on 3/15/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('AddModal', AddModal);

    AddModal.$inject = ['applicationData', 'firebaseDataService', '$scope'];

    function AddModal(applicationData, firebaseDataService, $scope) {
        var vm = this;
        vm.addItem = addItem;
        vm.name = "";
        vm.quantity = 0;
        vm.storageAreas = applicationData.storageAreas;
        vm.storageAreaID = null;

        activate();

        function activate() {
        }

        function addItem() {
            var item = {
                name: vm.name,
                quantity: vm.quantity,
                storageAreaID: vm.storageAreaID
            };
            firebaseDataService.pushItem(item).then(function(newItemKey) {
                applicationData.items[newItemKey] = item;
                applicationData.itemsModified = true;
            });
        }
    }
})();