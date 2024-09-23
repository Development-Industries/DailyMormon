// Function to inject a verse into the webpage (for annotation or display)
function injectVerse(verse, excerpt) {
    // Create a container for the verse
    const verseContainer = document.createElement('div');
    verseContainer.id = 'mormon-verse-container';
    verseContainer.style.position = 'fixed';
    verseContainer.style.bottom = '10px';
    verseContainer.style.right = '10px';
    verseContainer.style.padding = '15px';
    verseContainer.style.backgroundColor = '#ffffff';
    verseContainer.style.border = '2px solid #ddd';
    verseContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    verseContainer.style.zIndex = '9999';
    verseContainer.style.fontFamily = 'Arial, sans-serif';
    verseContainer.style.width = '300px';

    // Add the verse and excerpt text
    const verseText = document.createElement('h4');
    verseText.textContent = verse;
    verseText.style.color = '#333';
    verseText.style.fontSize = '16px';

    const excerptText = document.createElement('p');
    excerptText.textContent = excerpt;
    excerptText.style.color = '#555';
    excerptText.style.fontSize = '14px';

    // Add close button to remove the verse box
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';

    // Add close functionality
    closeButton.addEventListener('click', function () {
        verseContainer.remove();
    });

    // Append the text and button to the container
    verseContainer.appendChild(verseText);
    verseContainer.appendChild(excerptText);
    verseContainer.appendChild(closeButton);

    // Append the container to the body of the webpage
    document.body.appendChild(verseContainer);
}

// Function to fetch a random verse from the JSON file
function fetchRandomVerse() {
    chrome.runtime.sendMessage({ action: 'getRandomVerse' }, function (response) {
        const verse = response.verse;
        const excerpt = response.excerpt;
        injectVerse(verse, excerpt);  // Call the inject function to display the verse
    });
}

// Listen for a message from the popup or background script to inject a verse
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'showVerse') {
        fetchRandomVerse();  // Fetch and inject a random verse
        sendResponse({ status: 'Verse injected' });
    }
});
