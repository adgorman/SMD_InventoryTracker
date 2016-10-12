/**
 * Created by Adam on 7/7/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('applicationData', applicationData);

    applicationData.$inject = ['$q', 'firebaseDataService'];

    function applicationData($q, firebaseDataService) {
        var itemList = null;
        var storageAreaList = null;
        var serviceInitialized = false;
        var user = null;

        var service = {
            itemList: itemList,
            storageAreaList: storageAreaList,
            serviceInitialized: serviceInitialized,
            user: user
        };

        initService();
        return service;

        // Private Functions

        function initService() {
            // $q.all([getItemList(), getStorageAreaList()]).then(function() {
            //     // Add storage list to item list
            //     // Set service as initialized
            // });
        }

        function getStorageAreaList() {
            return firebaseDataService.getStorageAreaList().then(function(data) {
                // Set storage list
            });
        }

        function getItemList() {
            return firebaseDataService.getItemList().then(function(data) {
                // Set item list
            });
        }
    }
})();