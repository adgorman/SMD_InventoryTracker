/**
 * Created by Adam on 7/7/15.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('Shell', Shell);

    Shell.$inject = ['applicationData', '$scope'];

    function Shell(applicationData, $scope) {
        var vm = this;

        vm.applicationData = applicationData;
        vm.isAdmin = isAdmin;
        vm.historyClick = historyClick;
        vm.historyShow = false;
        vm.loginShow = true;
        vm.logoutClick = logoutClick;
        vm.useSuppliesClick = useSuppliesClick;
        vm.useSuppliesShow = false;
        vm.editInventoryClick = editInventoryClick;
        vm.editInventoryShow = false;

        activate();

        function activate() {
        }

        function isAdmin() {
            return !_.isNull(applicationData.user) && applicationData.user.admin;
        }

        function useSuppliesClick() {
            vm.useSuppliesShow = true;
            vm.historyShow = vm.loginShow = vm.editInventoryShow = false;
        }

        function historyClick() {
            vm.historyShow = true;
            vm.loginShow = vm.useSuppliesShow = vm.editInventoryShow = false;
        }

        function editInventoryClick() {
            vm.editInventoryShow = true;
            vm.historyShow = vm.loginShow = vm.useSuppliesShow = false;
        }

        function logoutClick() {
            applicationData.user = null;
            vm.loginShow = true;
            vm.historyShow = vm.useSuppliesShow = vm.editInventoryShow = false;
        }

        $scope.$watch(function() { return applicationData.user; }, function(after, before) {
            if(_.isNull(before) && !_.isNull(after)) {
                editInventoryClick();
            } else {
                logoutClick();
            }
        })
    }
})();