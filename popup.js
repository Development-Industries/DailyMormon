document.addEventListener('DOMContentLoaded', function () {
    const verseElement = document.getElementById('verse');
    const excerptElement = document.getElementById('excerpt');
    const dateElement = document.getElementById('date');
    const refreshButton = document.getElementById('refresh');

    // Fetch and load the daily verse from the Book of Mormon
    function loadVerse() {
        fetch('mormon_verses.json')
            .then(response => response.json())
            .then(data => {
                const verseData = getVerseForToday(data);
                verseElement.textContent = verseData.verse;
                excerptElement.textContent = verseData.excerpt;
                dateElement.textContent = `Verse for ${getFormattedDate()}`;
            })
            .catch(error => console.error('Error fetching verses:', error));
    }

    // Load a random verse when the button is clicked
    function loadRandomVerse() {
        fetch('mormon_verses.json')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const verseData = data[randomIndex];
                verseElement.textContent = verseData.verse;
                excerptElement.textContent = verseData.excerpt;
                dateElement.textContent = "Random Verse";
            })
            .catch(error => console.error('Error fetching verses:', error));
    }

    // Get today's verse based on the day of the year
    function getVerseForToday(data) {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // Ensure we wrap around the number of verses if the year exceeds the length
        const index = (dayOfYear % data.length);
        return data[index];
    }

    // Format the current date for display
    function getFormattedDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    }

    // Automatically load today's verse when the page is loaded
    loadVerse();

    // Load a random verse on button click
    refreshButton.addEventListener('click', loadRandomVerse);
});
