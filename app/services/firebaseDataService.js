/**
 * Created by Adam on 7/7/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('firebaseDataService', firebaseDataService);

    firebaseDataService.$inject = ['$q', '$firebaseArray'];

    function firebaseDataService($q, $firebaseArray) {
        var service = {
            deleteHistoryList: deleteHistoryList,
            deleteItem: deleteItem,
            getHistoryLists: getHistoryLists,
            getItems: getItems,
            getStorageAreas: getStorageAreas,
            pushHistoryList: pushHistoryList,
            pushItem: pushItem,
            updateItem: updateItem
        };

        initService();
        return service;

        // Public Functions

        function deleteHistoryList(id) {
            var deferred = $q.defer();

            var historyRef = firebase.database().ref('history/' + id);
            historyRef.remove()
                .then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    diferred.reject("Remove failed: " + error.message);
                });

            return deferred.promise;
        }

        function deleteItem(id) {
            var deferred = $q.defer();

            var historyRef = firebase.database().ref('item/' + id);
            historyRef.remove()
                .then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    diferred.reject("Remove failed: " + error.message);
                });

            return deferred.promise;
        }

        function getHistoryLists() {
            var deferred = $q.defer();

            var historyRef = firebase.database().ref('history/' + id);
            historyRef.remove()
                .then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    diferred.reject("Remove failed: " + error.message);
                });

            return deferred.promise;
        }

        function getItems() {

        }

        function getStorageAreas() {
            var deferred = $q.defer();



            return deferred.promise;
        }

        function pushHistoryList(object) {

        }

        function pushItem(object) {

        }

        function updateItem(id, object) {

        }

        // Private Functions

        function initService() {
            var config = {
                apiKey: "AIzaSyBch2_i_FHwmS2Fxa9OkFE0bC7lPk-ImKA",
                authDomain: "smd-inventory.firebaseapp.com",
                databaseURL: "https://smd-inventory.firebaseio.com",
                storageBucket: "smd-inventory.appspot.com",
                messagingSenderId: "20965966404"
            };
            firebase.initializeApp(config);

            // var ref = firebase.database().ref('items');
            // _.each(itemList, function(object) {
            //     debugger;
            //     var newPostRef = ref.push();
            //     newPostRef.set(object);
            // });
        }
    }
})();