const adjectives = ['Whispering', 'Glowing', 'Shimmering', 'Dancing', 'Singing', 'Floating', 'Giggling', 'Dreaming', 'Sparkling', 'Moonlit'];
const nouns = ['Fern', 'Orchid', 'Cactus', 'Vine', 'Moss', 'Lily', 'Shrub', 'Blossom', 'Sprout', 'Leaf'];
const features = ['tentacles', 'crystals', 'bubbles', 'eyes', 'feathers', 'bells', 'mirrors', 'clockwork', 'smoke', 'rainbows'];
const abilities = ['teleport', 'sing lullabies', 'predict the future', 'change colors', 'levitate', 'communicate telepathically', 'create illusions', 'manipulate time', 'absorb memories', 'grant wishes'];
const rarities = [
    { name: 'Common', chance: 0.6, class: 'common' },
    { name: 'Uncommon', chance: 0.25, class: 'uncommon' },
    { name: 'Rare', chance: 0.1, class: 'rare' },
    { name: 'Legendary', chance: 0.05, class: 'legendary' }
];
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
let currentSeason = 0;
let currentPlant = null;

const encyclopediaEntries = [
    { name: 'Whispering Fern', description: 'A mysterious fern that produces soft whispers when its leaves rustle.' },
    { name: 'Glowing Orchid', description: 'An orchid that emits a soft, bioluminescent light in the dark.' },
    { name: 'Shimmering Cactus', description: 'A cactus covered in iridescent spines that shimmer in sunlight.' },
    { name: 'Dancing Vine', description: 'A vine that sways and twirls even in the absence of wind.' },
    { name: 'Singing Moss', description: 'A moss that produces melodious tones when moisture passes through it.' }
];

const careGuideInfo = {
    light: [
        'Provide bright, indirect light for most plants.',
        'Some plants may require full sun or shade, depending on their species.',
        'Rotate your plant regularly to ensure even growth.'
    ],
    water: [
        'Water thoroughly when the top inch of soil feels dry.',
        'Ensure proper drainage to prevent root rot.',
        'Adjust watering frequency based on the season and humidity levels.'
    ],
    soil: [
        'Use well-draining potting mix appropriate for your plant type.',
        'Repot your plant every 1-2 years or when it outgrows its current pot.',
        'Add organic matter to the soil to improve nutrient content.'
    ],
    fertilizer: [
        'Feed your plant with a balanced, water-soluble fertilizer during the growing season.',
        'Reduce or stop fertilizing during the plant\'s dormant period.',
        'Always follow the instructions on the fertilizer package to avoid over-fertilizing.'
    ],
    maintenance: [
        'Regularly remove dead or yellowing leaves to promote healthy growth.',
        'Dust the leaves gently with a damp cloth to keep them clean and able to photosynthesize efficiently.',
        'Prune your plant as needed to maintain its shape and size.'
    ]
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generatePlantName() {
    return `${getRandomElement(adjectives)} ${getRandomElement(nouns)}`;
}

function generatePlantDescription() {
    return `This peculiar ${seasons[currentSeason].toLowerCase()} plant has ${getRandomElement(features)} instead of leaves and can ${getRandomElement(abilities)} when exposed to moonlight.`;
}

function generatePlantRarity() {
    const rand = Math.random();
    let cumulativeChance = 0;
    for (const rarity of rarities) {
        cumulativeChance += rarity.chance;
        if (rand < cumulativeChance) {
            return rarity;
        }
    }
    return rarities[0];
}

async function getRandomPlantImage() {
    try {
        const response = await fetch(`https://source.unsplash.com/400x300/?plant,${seasons[currentSeason]}`);
        return response.url;
    } catch (error) {
        console.error('Error fetching plant image:', error);
        return 'https://via.placeholder.com/400x300.png?text=Plant+Image+Unavailable';
    }
}

async function generatePlant() {
    const plantName = generatePlantName();
    const plantDescription = generatePlantDescription();
    const plantRarity = generatePlantRarity();
    const plantImageUrl = await getRandomPlantImage();

    currentPlant = { name: plantName, description: plantDescription, rarity: plantRarity, imageUrl: plantImageUrl };

    document.getElementById('plant-name').textContent = plantName;
    document.getElementById('plant-description').textContent = plantDescription;
    document.getElementById('plant-image').src = plantImageUrl;

    const rarityElement = document.getElementById('plant-rarity');
    rarityElement.textContent = plantRarity.name;
    rarityElement.className = plantRarity.class;
}

function updateSeason() {
    currentSeason = (currentSeason + 1) % seasons.length;
    document.getElementById('season-display').textContent = `Current Season: ${seasons[currentSeason]}`;
    document.body.className = seasons[currentSeason].toLowerCase();
    generatePlant();
}

function saveFavorite() {
    if (currentPlant) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(currentPlant);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Plant saved to favorites!');
    }
}

function showFavorites() {
    const favoritesModal = document.getElementById('favorites-modal');
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(plant => {
        const plantElement = document.createElement('div');
        plantElement.className = 'favorite-item';
        plantElement.innerHTML = `
            <img src="${plant.imageUrl}" alt="${plant.name}">
            <p>${plant.name}</p>
            <p class="${plant.rarity.class}">${plant.rarity.name}</p>
        `;
        favoritesList.appendChild(plantElement);
    });

    favoritesModal.style.display = 'block';
}

function showEncyclopedia() {
    const encyclopediaModal = document.getElementById('encyclopedia-modal');
    const encyclopediaList = document.getElementById('encyclopedia-list');
    encyclopediaList.innerHTML = '';

    encyclopediaEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'encyclopedia-item';
        entryElement.innerHTML = `
            <h3>${entry.name}</h3>
            <p>${entry.description}</p>
        `;
        encyclopediaList.appendChild(entryElement);
    });

    encyclopediaModal.style.display = 'block';
}

function showCareGuide() {
    const careGuideModal = document.getElementById('care-guide-modal');
    const careGuideContent = document.getElementById('care-guide-content');
    careGuideContent.innerHTML = '';

    for (const [category, tips] of Object.entries(careGuideInfo)) {
        const categoryElement = document.createElement('div');
        categoryElement.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <ul>
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
        careGuideContent.appendChild(categoryElement);
    }

    careGuideModal.style.display = 'block';
}

function toggleShareOptions() {
    const shareOptions = document.getElementById('share-options');
    shareOptions.style.display = shareOptions.style.display === 'none' ? 'block' : 'none';
}

function sharePlant(platform) {
    if (!currentPlant) return;

    let shareUrl = '';
    const text = `Check out this amazing plant: ${currentPlant.name}!`;
    const url = encodeURIComponent(window.location.href);

    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${encodeURIComponent(currentPlant.imageUrl)}&description=${encodeURIComponent(text)}`;
            break;
    }

    window.open(shareUrl, '_blank');
}

document.getElementById('generate-btn').addEventListener('click', generatePlant);
document.getElementById('save-favorite-btn').addEventListener('click', saveFavorite);
document.getElementById('favorites-btn').addEventListener('click', showFavorites);
document.getElementById('encyclopedia-btn').addEventListener('click', showEncyclopedia);
document.getElementById('care-guide-btn').addEventListener('click', showCareGuide);
document.getElementById('share-btn').addEventListener('click', toggleShareOptions);
document.getElementById('share-twitter').addEventListener('click', () => sharePlant('twitter'));
document.getElementById('share-facebook').addEventListener('click', () => sharePlant('facebook'));
document.getElementById('share-pinterest').addEventListener('click', () => sharePlant('pinterest'));

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

setInterval(updateSeason, 30000);
updateSeason();