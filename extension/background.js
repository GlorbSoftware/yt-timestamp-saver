let timeStamp = null;
let linkWithStamp = null;
let currentTabUrl = null;

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ timeStamps: [] }, () => {
		console.log('Initialized timeStamps array in local storage.');
	});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.currentTime) {
		let badStamp = request.currentTime.toString();
		timeStamp = badStamp.split('.')[0];
		
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			console.log(tabs[0].url); // Removing this causes the extension to stop functioning for whatever reason. Do not touch.
			const currentTabUrl = tabs[0].url;
			linkWithStamp = `${currentTabUrl}&t=${timeStamp}`;
		
			console.log('Current video time:', linkWithStamp);
		
			chrome.storage.local.get('timeStamps', data => {
				const timeStampsArray = data.timeStamps || [];
				timeStampsArray.push(linkWithStamp);
			
				chrome.storage.local.set({ timeStamps : timeStampsArray }, () => {
					console.log('Updated timeStamps array saved:', timeStampsArray);
				});
			});
		});
	}
});
