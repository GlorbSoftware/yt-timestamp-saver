// Function to add the custom button to the leftmost position of the right controls
function addCustomButtonToRight() {
	const rightControls = document.querySelector('.ytp-right-controls');
	if (!rightControls) {
		console.log("Right controls not found.");
		return;
	}

    // Create the custom button
	const customButton = document.createElement('button');
	customButton.className = 'ytp-button custom-button';

    // Set the button's inner HTML to an icon or image
	customButton.innerHTML = `<img src="${chrome.runtime.getURL('images/custom-icon.png')}" alt="Custom Button" style="width: 24px; height: 24px;">`;

    // Handle the button click
	customButton.addEventListener('click', () => {
		alert('Custom button clicked!');
		// Get current timestamp
		getCurrentTime();
	});

	// Insert the custom button as the first child of the right controls
	rightControls.insertBefore(customButton, rightControls.firstChild);
}

function getCurrentTime() {
	const videoPlayer = document.querySelector('video');
	if (videoPlayer) {
		// Send the current time back to the background script
		chrome.runtime.sendMessage({ currentTime: videoPlayer.currentTime });
	}
}

// Create the button when the youtube controls are fully loaded
window.addEventListener('yt-navigate-finish', addCustomButtonToRight);
