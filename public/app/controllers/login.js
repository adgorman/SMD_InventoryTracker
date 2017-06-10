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
        vm.login = login;
        vm.user = null;
        vm.userList = [
            {name: 'Street Medicine Detroit', userID: '1', admin: true},
            {name: 'Detroit Street Care', userID: '2', admin: true},
            {name: 'Guest', admin: false}
        ];

        activate();

        function activate() {
            vm.user = vm.userList[0];
            //applicationData.user = vm.user;
        }

        function login() {
            applicationData.user = vm.user;
        }
    }
})();