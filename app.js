const breedSelect = document.getElementById("breed");
const gallery = document.getElementById("images");

// To do:
// fetch list of all breeds and put them into form select
const loadBreeds = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  const breeds = data.message;

  for (breed of breeds){
    
  }
};
// Call the function when the website opnes
document.addEventListener('DOMContentLoaded', ()=> {
    loadBreeds();
});
// fetch images
// fetch("");

// // event listener på knapp
// const loadBtn = document
//   .getElementById("loadDog")
//   .addEventListener("click", (e) => {});
