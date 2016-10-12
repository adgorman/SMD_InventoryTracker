/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('EditList', EditList);

    EditList.$inject = ['applicationData'];

    function EditList(applicationData, $scope) {
        var vm = this;
        vm.cancelEdit = cancelEdit;
        vm.date = new Date();
        vm.editItem = editItem;
        vm.inventory = [
            {name: 'Hydrocodone', quantity: 4, storageArea: 'Bag 1', cost: 10, id: 0},
            {name: 'Zocor', quantity: 1, storageArea: 'Bag 2', cost: 1, id: 1},
            {name: 'Lisinopril', quantity: 10, storageArea: 'Bag 1', cost: 30, id: 2},
            {name: 'Synthroid', quantity: 10, storageArea: 'Bag 3', cost: 20, id: 3},
            {name: 'Norvasc', quantity: 20, storageArea: 'Bag 3', cost: 20, id: 4},
            {name: 'Prilosec', quantity: 36, storageArea: 'Bag 1', cost: 20, id: 5},
            {name: 'Azithromycin', quantity: 5, storageArea: 'Bag 2', cost: 20, id: 6},
            {name: 'Amoxicillin', quantity: 120, storageArea: 'Bag 2', cost: 20, id: 7},
            {name: 'Glucophage', quantity: 0, storageArea: 'Bag 2', cost: 20, id: 8},
            {name: 'Hydrochlorothiazide', quantity: 10, storageArea: 'Bag 3', cost: 20, id: 9}
        ];
        vm.inventory = _.sortBy(vm.inventory, function(item) { return item.name; });
        vm.location = "";
        vm.removeItem = removeItem;
        vm.save = save;
        vm.search = "";
        vm.selectedItem = {
            name: null,
            quantity: null,
            storageArea: null,
            cost: null,
            id: null
        };
        vm.selectedItemIndex = null;
        vm.usedSupplies = [];

        activate();

        function activate() {
            // pull from server inventory, storage areas
        }

        function cancelEdit() {
            vm.selectedItemIndex = null;
        }

        function editItem(itemIndex) {
            if(vm.selectedItemIndex == itemIndex) {
                cancelEdit();
                return;
            }
            vm.selectedItemIndex = itemIndex;
            var item = vm.inventory[itemIndex];
            vm.selectedItem = {
                name: item.name,
                quantity: item.quantity,
                storageArea: item.storageArea,
                cost: item.cost,
                id: item.id
            };
        }

        function removeItem(usedSupplyIndex) {
            var usedItem = _.findWhere(vm.usedSupplies, {itemID: usedSupplyIndex});
            usedItem.quantity--;
            if(usedItem.quantity == 0) {
                vm.usedSupplies = _.without(vm.usedSupplies, usedItem);
            }
            _.findWhere(vm.inventory, {id: usedItem.itemID}).quantity++;
        }

        function save() {
            if(_.isEmpty(vm.usedSupplies)) {
                return;
            }
            // add to server
        }
    }
})();