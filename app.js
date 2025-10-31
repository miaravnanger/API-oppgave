// Call the load breeds function when the website opens
document.addEventListener("DOMContentLoaded", () => {
  loadBreeds();
});
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


// Show h2 when loadDog is clicked 
const galleryTitle = document.querySelector("#gallery-section h2");
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

// Event listener for the button
document.getElementById("loadDog").addEventListener("click", getImages);
