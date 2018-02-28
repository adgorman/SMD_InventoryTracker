/**
 * Created by Adam on 1/29/18.
 */
(function() {
    'user strict';

    angular
        .module('app')
        .controller('DeleteModal', DeleteModal);

    DeleteModal.$inject = ['applicationData', 'firebaseDataService', 'itemID', '$q'];

    function DeleteModal(applicationData, firebaseDataService, itemID, $q) {
        var vm = this;
        vm.deleteItem = deleteItem;
        vm.mergeItem = mergeItem;
        vm.itemID = itemID;
        vm.items = applicationData.items;
        vm.mergeItemID = null;

        activate();

        function activate() {
            // TODO: Remove item to be deleted from list of merge-able items
        }

        // Public Functions

        function deleteItem() {
            firebaseDataService.deleteItem(vm.itemID).then(function() {
                delete applicationData.items[vm.itemID];
                applicationData.itemsModified = true;
            });
        }

        function mergeItem() {
            var promises = [];
            _.each(applicationData.historyLists, function(log, logID) {
                var editedList = false;
                _.each(log.itemList, function(item) {
                    if(!_.isUndefined(item) && item.itemID == vm.itemID) { // Log contains item to be deleted
                        var mergeItemInLog = _.find(log.itemList, function(i) {
                            return i.itemID == vm.mergeItemID
                        });

                        if(_.isUndefined(mergeItemInLog)) { // Merge item is not found in the log to be modified
                            item.itemID = vm.mergeItemID;
                        } else { // Merge item is found in the log to be modified
                            mergeItemInLog.quantity += item.quantity;
                            var itemIndex = _.indexOf(log.itemList, item);
                            if(itemIndex > -1) {
                                log.itemList.splice(itemIndex, 1);
                            }
                        }

                        editedList = true;
                    }
                });

                if(editedList) {
                    var updatedHistoryList = getUpdatedHistoryList(log.date, log.itemList, log.location, log.userID);
                    promises.push(firebaseDataService.setHistoryList(logID, updatedHistoryList));
                }
            });

            $q.all(promises).then(function() {
                deleteItem();
            });
        }

        // Private Functions

        function getUpdatedHistoryList(date, itemList, location, userID) {
            var updatedHistoryList = {
                date: date,
                itemList: itemList,
                location: location,
                userID: userID
            };
            _.each(updatedHistoryList.itemList, function(item) {
                if(!_.isUndefined(item["$$hashKey"])) { // Angular and Firebase.js quirk
                    delete item["$$hashKey"];
                }
            });

            return updatedHistoryList;
        }
    }
})();