/**
 * Created by Adam on 3/14/16.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('Log', Log);

    Log.$inject = ['applicationData'];

    function Log(applicationData, $scope) {
        var vm = this;
        vm.logList = [
            {date:'1/1/2015', item: 'Fudge Brownies', quantity: 5, cost: 30},
            {date:'11/11/2015', item: 'Magic Potion', quantity: 1, cost: 20},
            {date:'11/11/2015', item: 'Banana', quantity: 1, cost: 1},
            {date:'2/12/2016', item: 'Fudge Brownies', quantity: 2, cost: 12},
            {date:'2/12/2016', item: 'Something', quantity: 1, cost: 10},
            {date:'2/13/2016', item: 'Something Else', quantity: 2, cost: 10}
        ];

        activate();

        function activate() {
            sortLogList();
        }

        function sortLogList() {
            //for(var i = 0; i < vm.logList.length; ++i) {
            //    vm.logList[i].showDate = i == 0 || vm.logList[i - 1].date != vm.logList[i].date;
            //}
        }
    }
})();