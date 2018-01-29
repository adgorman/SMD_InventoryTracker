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
        vm.items = applicationData.items;
        vm.remove = remove;
        vm.save = save;
        vm.search = "";
        vm.selectedItem = {
            brand: "",
            name: "",
            price: "",
            storageAreaID: ""
        };
        vm.selectedItemIndex = null;
        vm.selectedItemStorageArea = null;
        vm.storageAreas = applicationData.storageAreas;

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
                brand: item.brand,
                name: item.name,
                price: item.price,
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

                item.brand = vm.selectedItem.brand;
                item.name = vm.selectedItem.name;
                item.price = vm.selectedItem.price;
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