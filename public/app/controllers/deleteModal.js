/**
 * Created by Adam on 1/29/18.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('DeleteModal', DeleteModal);

    DeleteModal.$inject = ['applicationData', 'firebaseDataService', 'itemID'];

    function DeleteModal(applicationData, firebaseDataService, itemID) {
        var vm = this;
        vm.deleteItem = deleteItem;
        vm.mergeItem = mergeItem;
        vm.itemID = itemID;
        vm.items = applicationData.items;
        vm.mergeItemID = null;

        activate();

        function activate() {
        }

        function deleteItem() {
            firebaseDataService.deleteItem(vm.itemID).then(function() {
                delete applicationData.items[vm.itemID];
                applicationData.itemsModified = true;
            });
        }

        function mergeItem() {
            // something
        }
    }
})();