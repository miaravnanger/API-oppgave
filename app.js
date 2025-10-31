// Call the function when the website opnes
document.addEventListener("DOMContentLoaded", () => {
  loadBreeds();
});
// To do:
// function to make the first letter capitalized
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
// fetch list of all breeds and put them into form select
const loadBreeds = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = data.message;

    const select = document.getElementById("selectBreed");

    for (const breed in breeds) {
      const subBreeds = breeds[breed];

      if (subBreeds.length === 0) {
        const option = document.createElement("option");
        option.value = "breed";
        option.textContent = capitalize(breed);
        select.appendChild(option);
      } else {
        for (const sub of subBreeds) {
          const option = document.createElement("option");
          option.value = `${breed}/${sub}`;
          option.textContent = `${capitalize(sub)} ${capitalize(breed)}`;
          select.appendChild(option);
          console.log();
        }
      }
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

const getImages = async () => {
  try {
    if (value === "all") {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
    } else if (value === "`${breed}") {
      const response = await fetch(
        "https://dog.ceo/api/breed/{breed}/hound/images"
      );
      const data = await response.json();
    } else if (value === "`${breed}/${sub}`") {
      const response = await fetch(
        "https://dog.ceo/api/breed/{breed}/{subbreed}/hound/images"
      );
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//   Get the button and add eventlistener and the if statements with the correct API paths
document.getElementById("loadDog").addEventListener("change", getImages);
// fetch images
// const randomImages = async () => {
// try {
//     const response = await fetch("https://dog.ceo/api/breeds/image/random");
//     const data = await response.json()
// } catch(error){
//     console.log("Something went wrong", error)
// }
//   };
// // event listener på knapp
// const loadBtn = document
//   .getElementById("loadDog")
//   .addEventListener("click", (e) => {});

// add to gallery
// const gallery = document.getElementById("images");
