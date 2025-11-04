// To do:
// Make the first letter in the breeds capitalized
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
// fetch list of all breeds and put them into form select
const loadBreeds = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = data.message;

    const breedSelect = document.getElementById("selectBreed");

    for (const breed in breeds) {
      const subBreeds = breeds[breed];

      if (subBreeds.length === 0) {
        const option = document.createElement("option");
        option.value = breed;
        option.textContent = capitalize(breed);
        breedSelect.appendChild(option);
      } else {
        for (const sub of subBreeds) {
          const option = document.createElement("option");
          option.value = `${breed}/${sub}`;
          option.textContent = `${capitalize(sub)} ${capitalize(breed)}`;
          breedSelect.appendChild(option);
          console.log();
        }
      }
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

// fetching images from the dogAPI depending on what the user selects
const getImages = async () => {
  const breedSelect = document.getElementById("selectBreed");
  const breedValue = breedSelect.value;
  const numSelect = document.getElementById("amount");
  const num = numSelect.value;

  let url;

  if (breedValue === "all") {
    url = `https://dog.ceo/api/breeds/image/random/${num}`;
  } else {
    url = `https://dog.ceo/api/breed/${breedValue}/images/random/${num}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // display images in gallery
    const gallery = document.getElementById("images");
    gallery.innerHTML = "";
    data.message.forEach((imgUrl) => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = "Dog!";
      img.width = 250;
      gallery.appendChild(img);
    });

    // Show Gallery h2 only when loadDog has been clicked
    const galleryTitle = document.querySelector(".gallery-title");
    galleryTitle.style.display = "block";

    const imageCount = data.message.length;
    if (imageCount === 1) {
      gallery.style.gridTemplateColumns = "1fr";
    } else if (imageCount === 2 || imageCount === 4) {
      gallery.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else {
      gallery.style.gridTemplateColumns = "repeat(3, 1fr)";
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
// Event listener to load functions when the website is opened
document.addEventListener("DOMContentLoaded", () => {
  loadBreeds();

  // Search input and get images
  const breedSelect = document.getElementById("selectBreed");
  const breedSearch = document.getElementById("breedSearch");
  const loadButton = document.getElementById("loadDog");

  // Listening for input value from user, show the options that includes what the user inputs, dont display the other options
  breedSearch.addEventListener("input", () => {
    const filter = breedSearch.value.toLowerCase();
    for (let option of breedSelect.options) {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(filter) ? "" : "none";
    }
  });

  // Load images
  loadButton.addEventListener("click", getImages);
});
