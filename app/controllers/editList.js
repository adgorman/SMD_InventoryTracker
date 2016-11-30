/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('EditList', EditList);

    EditList.$inject = ['applicationData', '$uibModal', '$scope'];

    function EditList(applicationData, $uibModal, $scope) {
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

        }

        function save() {

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
            if(vm.addItemModalInstance) {
                vm.addItemModalInstance.close();
            }
        });
    }
})();