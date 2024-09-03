let buttonExists = false;
const logoUrl = chrome.runtime.getURL('ExtensionClicked/images/logo.png');

// Function to add the custom button to the leftmost position of the right controls
function addCustomButtonToRight() {
	// Find where the right controls are
	const rightControls = document.querySelector('.ytp-right-controls');
	if (!rightControls) {
		console.log("Right controls not found.");
		return;
	}
	
	// Prevent button duplication
	if (buttonExists) {
		return;
	}

    // Create the custom button
	const customButton = document.createElement('button');
	customButton.className = 'ytp-button custom-button';
	
	customButton.innerHTML = `<img src="${logoUrl}" alt="Custom Button" style="width: 24px; height: 24px;">`;
	
	customButton.style.position = 'relative';
	customButton.style.top = '-12px';
	customButton.style.left = '18px';


    // Handle the button click
	customButton.addEventListener('click', () => {
		alert('Custom button clicked!');
		getCurrentTime();
	});

	// Insert the custom button as the first child of the right controls
	rightControls.insertBefore(customButton, rightControls.firstChild);
	
	// Set the flag of the button existing to true, so it won't duplicate
	buttonExists = true;
}

// Get the current timestamp and send it to the background script
function getCurrentTime() {
	const videoPlayer = document.querySelector('video');
	if (videoPlayer) {
		// Send the current time back to the background script
		chrome.runtime.sendMessage({ currentTime: videoPlayer.currentTime });
	}
}

// Create the button when the youtube controls are fully loaded
if (!buttonExists) {
	window.addEventListener('yt-navigate-finish', addCustomButtonToRight);
}