/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('EditList', EditList);

    EditList.$inject = ['applicationData', 'firebaseDataService', '$uibModal', '$scope'];

    function EditList(applicationData, firebaseDataService, $uibModal, $scope) {
        var vm = this;
        vm.addItem = addItem;
        vm.addItemModalInstance = null;
        vm.editItem = editItem;
        vm.items = [];
        vm.remove = remove;
        vm.save = save;
        vm.search = "";
        vm.selectedItem = {
            name: null,
            quantity: null,
            storageAreaID: null
        };
        vm.selectedItemIndex = null;
        vm.selectedItemStorageArea = null;
        vm.storageAreas = [];

        activate();

        function activate() {
            // Pull from DB
        }

        function addItem() {
            vm.addItemModalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'app/views/addModal.html',
                controller: 'AddModal',
                controllerAs: 'addModal',
                size: 'large'
            });
        }

        function editItem(itemIndex) {
            if(vm.selectedItemIndex == itemIndex) {
                vm.selectedItemIndex = null;
                return;
            }
            vm.selectedItemIndex = itemIndex;
            var item = vm.items[itemIndex];
            vm.selectedItem = {
                name: item.name,
                quantity: item.quantity,
                storageAreaID: item.storageAreaID
            };
        }

        function remove() {
            firebaseDataService.deleteItem(vm.selectedItemIndex).then(function() {
                delete applicationData.items[vm.selectedItemIndex];
                vm.selectedItemIndex = null;
            })
        }

        function save() {
            firebaseDataService.setItem(vm.selectedItemIndex, vm.selectedItem).then(function() {
                var item = vm.items[vm.selectedItemIndex];
                item.name = vm.selectedItem.name;
                item.quantity = vm.selectedItem.quantity;
                item.storageAreaID = vm.selectedItem.storageAreaID;

                vm.selectedItemIndex = null;
            });
        }

        $scope.$watch(function() { return applicationData.serviceInitialized; }, function(initialized) {
            if(!initialized) {
                return;
            }
            vm.items = applicationData.items;
            vm.storageAreas = applicationData.storageAreas;
        });

        $scope.$watch(function() { return applicationData.itemsModified; }, function(modified) {
            if(!modified) {
                return;
            }
            vm.items = applicationData.items;
            applicationData.itemsModified = false;
            if(vm.addItemModalInstance) {
                vm.addItemModalInstance.close();
            }
        });
    }
})();