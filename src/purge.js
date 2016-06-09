deletedUsers = [];

injectBlockButtons = function () {
	var comment_headers = document.getElementsByClassName("timeline-comment-header-text");
	for (var i=0; i<comment_headers.length; i++){
		var header = comment_headers[i];

		var bullet = document.createTextNode("• ");
		header.appendChild(bullet);

		var aNode = document.createElement("a");
		aNode.appendChild(document.createTextNode("Block User"));
		aNode.addEventListener("click", blockUser);
		header.appendChild(aNode);
	}
};

clearComments = function () {
	var comments = document.getElementsByClassName("timeline-comment-wrapper js-comment-container");
	for (var i=0; i<comments.length; i++){
		var comment = comments[i];
		var author = comment.getElementsByClassName("author")[0];
		if (author !== undefined){
			for (var j=0; j<deletedUsers.length; j++){
				if (author.textContent === deletedUsers[j]) {
					comment.classList.add("hidden");
				}
			}
		}
	}
};

clearDiscussions = function () {
	var comments = document.getElementsByClassName("discussion-item");
	for (var i=0; i<comments.length; i++){
		var comment = comments[i];
		var author = comment.getElementsByClassName("author")[0];
		if (author !== undefined){
			for (var j=0; j<deletedUsers.length; j++){
				if (author.textContent === deletedUsers[j]) {
					comment.classList.add("hidden");
				}
			}
		}
	}
}

blockUser = function (e) {
	var username = e.target.parentNode.firstElementChild.firstElementChild.firstChild.textContent;

	chrome.runtime.sendMessage({query: "addDeletedUser", deletedUser: username}, function(response) {
		data = JSON.parse(response);
		deletedUsers = data.deletedUsers;
		clearComments();
		clearDiscussions();
	});
};

chrome.runtime.sendMessage({query: "getDeletedUsers"}, function (response) {
	var data = JSON.parse(response);
	deletedUsers = data.deletedUsers;
	clearComments();
	clearDiscussions();
});

injectBlockButtons();
