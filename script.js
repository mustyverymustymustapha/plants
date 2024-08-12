const adjectives = ['Whispering', 'Glowing', 'Shimmering', 'Dancing', 'Singing', 'Floating', 'Giggling', 'Dreaming', 'Sparkling', 'Moonlit'];
const nouns = ['Fern', 'Orchid', 'Cactus', 'Vine', 'Moss', 'Lily', 'Shrub', 'Blossom', 'Sprout', 'Leaf'];
const features = ['tentacles', 'crystals', 'bubbles', 'eyes', 'feathers', 'bells', 'mirrors', 'clockwork', 'smoke', 'rainbows'];
const abilities = ['teleport', 'sing lullabies', 'predict the future', 'change colors', 'levitate', 'communicate telepathically', 'create illusions', 'manipulate time', 'absorb memories', 'grant wishes'];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generatePlantName() {
    return `${getRandomElement(adjectives)} ${getRandomElement(nouns)}`;
}

function generatePlantDescription() {
    return `This peculiar plant has ${getRandomElement(features)} instead of leaves and can ${getRandomElement(abilities)} when exposed to moonlight.`;
}

async function getRandomPlantImage() {
    try {
        const response = await fetch('https://source.unsplash.com/400x300/?plant');
        return response.url;
    } catch (error) {
        console.error('Error fetching plant image:', error);
        return 'https://via.placeholder.com/400x300.png?text=Plant+Image+Unavailable';
    }
}

async function generatePlant() {
    const plantName = generatePlantName();
    const plantDescription = generatePlantDescription();
    const plantImageUrl = await getRandomPlantImage();

    document.getElementById('plant-name').textContent = plantName;
    document.getElementById('plant-description').textContent = plantDescription;
    document.getElementById('plant-image').src = plantImageUrl;
}