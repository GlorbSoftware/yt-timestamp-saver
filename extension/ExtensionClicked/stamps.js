document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM fully loaded and parsed');

	chrome.storage.local.get('timeStamps', function(data) {
		console.log('Retrieved data:', data);
		const timeStampsArray = data.timeStamps || [];
		const timeStampsList = document.getElementById('timeStampsList');

		// Check if the array is empty
		console.log('Time Stamps Array:', timeStampsArray);

		// Display each timestamp as a new list item
		timeStampsArray.forEach(function(timeStamp) {
			const listItem = document.createElement('li');
			const lrink = document.createElement('a');
			lrink.href = timeStamp;
			lrink.textContent = timeStamp;
			lrink.target = "_blank";
			listItem.appendChild(lrink);
			timeStampsList.appendChild(listItem);
		});
	});
});
