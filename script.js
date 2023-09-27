var currentBreed; // represent the current dog breed images we are looking at

// load all dog breed info from api
async function dogBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const dogList = await response.json();
    makeList(dogList.message);
}
dogBreeds();

// make all breeds available for selection
function makeList(listOfDogs) {
    document.getElementById("dogList").innerHTML = `
    <select onchange="getImages(this.value)">
        <option>List of Dogs</option>
        ${Object.keys(listOfDogs).map(function (breed) {
            return `<option>${breed}</option>`
          }).join('')}
    </select>
    `
}

// get 5 random images for the dog breed asked for
async function getImages (dogBreed) {
    if (dogBreed != "List of Dogs") {
        currentBreed = dogBreed;
        const response = await fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random/5`);
        const randomDog = await response.json();
        randomDogImages(randomDog.message)
    }
}

// make images of the 5 random dogs in the 5 divs for images
function randomDogImages(picOfDog) {
    document.getElementById("imageBox0").innerHTML = `
    <div class="image" style="background-image: url('${picOfDog[0]}');"></div>
    `;

    document.getElementById("imageBox1").innerHTML = `
    <div class="image" style="background-image: url('${picOfDog[1]}');"></div>
    `;

    document.getElementById("imageBox2").innerHTML = `
    <div class="image" style="background-image: url('${picOfDog[2]}');"></div>
    `;

    document.getElementById("imageBox3").innerHTML = `
    <div class="image" style="background-image: url('${picOfDog[3]}');"></div>
    `;

    document.getElementById("imageBox4").innerHTML = `
    <div class="image" style="background-image: url('${picOfDog[4]}');"></div>
    `;
}

// allow new images of the current breed to be loaded periodically
setInterval(() => {
    getImages(currentBreed);
}, 4000);