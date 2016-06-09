/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <ppeposp@gmail.com> wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 *                                                    Philippe Pepos Petitclerc
 * ----------------------------------------------------------------------------
 */

chrome.storage.local.get("deletedUsers", function (data) {
	if (data.deletedUsers == undefined) {
		chrome.storage.local.set({deletedUsers: []}, function () {});
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.query == "getDeletedUsers") {
		chrome.storage.local.get("deletedUsers", function (data) {
			sendResponse(JSON.stringify(data));
		});
	} else if (request.query == "addDeletedUser"){
		chrome.storage.local.get("deletedUsers", function (data) {
			data.deletedUsers.push(request.deletedUser);
			chrome.storage.local.set({deletedUsers: data.deletedUsers}, function () {
				sendResponse(JSON.stringify(data));
			});
		});
	}
	return true;
});
