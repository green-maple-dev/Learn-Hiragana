// 1. The Deck: The data source for the cards
const deck = [
    { front: "猫", reading: "ねこ (Neko)", back: "Cat" },
    { front: "食べる", reading: "たべる (Taberu)", back: "To eat" },
    { front: "水", reading: "みず (Mizu)", back: "Water" },
    { front: "先生", reading: "せんせい (Sensei)", back: "Teacher" },
    { front: "日本", reading: "にほん (Nihon)", back: "Japan" }
];

let currentIndex = 0;
let shuffledDeck = [];

// 2. Elements from the HTML
const cardElement = document.getElementById('card');
const frontText = document.getElementById('front-text');
const backText = document.getElementById('back-text');
const readingText = document.getElementById('reading-text');
const counterText = document.getElementById('counter');

// 3. Shuffle Function: Mixes the cards so it's not the same every time
function shuffleDeck() {
    shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    updateUI();
}

// 4. Flip Function: Toggles the CSS 'flipped' class
function flipCard() {
    cardElement.classList.toggle('flipped');
}

// 5. Next Card Function: Resets flip and moves to next index
function nextCard() {
    // 1. Flip it back to the front first
    cardElement.classList.remove('flipped');

    // 2. Wait 150ms for the flip animation to hide the back text
    // then swap the content so the user doesn't see the text change
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % shuffledDeck.length;
        updateUI();
    }, 150);
}

// 6. Update UI: Pushes data into the HTML tags
function updateUI() {
    const cardData = shuffledDeck[currentIndex];
    frontText.innerText = cardData.front;
    readingText.innerText = cardData.reading;
    backText.innerText = cardData.back;
    
    // Update the counter (e.g., "Card 2 of 5")
    counterText.innerText = `Card ${currentIndex + 1} of ${shuffledDeck.length}`;
}

// 7. Keyboard Shortcuts: For a better "Anki" experience
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scrolling
        flipCard();
    } else if (e.code === 'ArrowRight' || e.code === 'Enter') {
        nextCard();
    }
});

// Initialize the app on page load
shuffleDeck();