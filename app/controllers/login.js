/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['applicationData', '$scope'];

    function Login(applicationData, $scope) {
        var vm = this;
        vm.badPassword = false;
        vm.invalidPassword = false;
        vm.login = login;
        vm.needsPassword = needsPassword;
        vm.password = '';
        vm.user = null;
        vm.userList = [
            {name: 'Street Medicine Detroit', password: 'WSUsmd123inventory', admin: true},
            {name: 'Guest', admin: false}
        ];

        activate();

        function activate() {
            vm.user = vm.userList[0];
            // applicationData.user = vm.user;
        }

        function login() {
            var password = vm.password;
            vm.badPassword = false;
            vm.password = '';

            if(needsPassword() && password != vm.user.password) {
                vm.badPassword = true;
                return;
            }

            applicationData.user = vm.user;
        }

        function needsPassword() {
            return !_.isUndefined(vm.user.password);
        }

        $scope.$watch(function() { return vm.user; }, function() {
            vm.badPassword = false;
            vm.password = '';
        });
    }
})();