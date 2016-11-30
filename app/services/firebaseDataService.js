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
            setItem: setItem
        };

        initService();
        return service;

        // Public Functions

        function deleteHistoryList(id) {
            var deferred = $q.defer();

            var historyRef = firebase.database().ref('historyLists/' + id);
            historyRef.remove()
                .then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    deferred.reject("Remove failed: " + error.message);
                });

            return deferred.promise;
        }

        function deleteItem(id) {
            var deferred = $q.defer();

            var itemRef = firebase.database().ref('items/' + id);
            itemRef.remove()
                .then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    deferred.reject("Remove failed: " + error.message);
                });

            return deferred.promise;
        }

        function getHistoryLists() {
            var deferred = $q.defer();

            var historyRef = firebase.database().ref('historyLists');
            historyRef.once('value')
                .then(function(snapshot) {
                    deferred.resolve(snapshot.val());
                })
                .catch(function(error) {
                    deferred.reject("Remove failed: " + error.message);
                });

            return deferred.promise;
        }

        function getItems() {
            var deferred = $q.defer();

            var itemsRef = firebase.database().ref('items');
            itemsRef.once('value')
                .then(function(snapshot) {
                    deferred.resolve(snapshot.val());
                })
                .catch(function(error) {
                    deferred.reject("Get failed: " + error.message);
                });

            return deferred.promise;
        }

        function getStorageAreas() {
            var deferred = $q.defer();

            var storageAreasRef = firebase.database().ref('storageAreas');
            storageAreasRef.once('value')
                .then(function(snapshot) {
                    deferred.resolve(snapshot.val());
                })
                .catch(function(error) {
                    deferred.reject("Get failed: " + error.message);
                });

            return deferred.promise;
        }

        function pushHistoryList(object) {
            var deferred = $q.defer();

            var historyListRef = firebase.database().ref('historyLists');
            historyListRef.push(object)
                .then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    deferred.reject("Push failed: " + error.message);
                });

            return deferred.promise;
        }

        function pushItem(object) {
            var deferred = $q.defer();

            var itemListRef = firebase.database().ref('items');
            itemListRef.push(object)
                .then(function(snapshot) {
                    deferred.resolve(snapshot.key);
                })
                .catch(function(error) {
                    deferred.reject("Push failed: " + error.message);
                });

            return deferred.promise;
        }

        function setItem(id, object) {
            var deferred = $q.defer();

            var itemRef = firebase.database().ref('items/' + id);
            itemRef.set(object)
                .then(function() {
                    deferred.resolve();
                })
                .catch(function(error) {
                    deferred.reject("Set failed: " + error.message);
                });

            return deferred.promise;
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
        }
    }
})();