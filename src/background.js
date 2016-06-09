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
