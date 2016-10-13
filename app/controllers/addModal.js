/**
 * Created by Adam on 3/15/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('AddModal', AddModal);

    AddModal.$inject = ['applicationData'];

    function AddModal(applicationData, $scope) {
        var vm = this;

        activate();

        function activate() {
            // Something
        }

    }
})();