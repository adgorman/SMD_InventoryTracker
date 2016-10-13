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
        var historyLists = null;
        var items = null;
        var storageAreas = null;
        var serviceInitialized = false;
        var user = null;

        var service = {
            historyLists: historyLists,
            items: items,
            storageAreas: storageAreas,
            serviceInitialized: serviceInitialized,
            user: user
        };

        initService(service);
        return service;

        // Private Functions

        function initService(service) {
            $q.all([getHistoryLists(), getItems(), getStorageAreas()]).then(function() {
                service.serviceInitialized = true;
            });
        }

        function getHistoryLists() {
            return firebaseDataService.getHistoryLists().then(function(data) {
                service.historyLists = data;
            });
        }

        function getStorageAreas() {
            return firebaseDataService.getStorageAreas().then(function(data) {
                service.storageAreas = data;
            });
        }

        function getItems() {
            return firebaseDataService.getItems().then(function(data) {
                service.items = data;
            });
        }
    }
})();