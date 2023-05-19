const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const form = document.querySelector(".popup__form");
const nameInput = document.getElementById("name");
const aboutInput = document.getElementById("about");
const saveButton = document.querySelector(".popup__save-button");
const profileName = document.querySelector(".profile__name")
const profileDescription = document.querySelector(".profile__description")



editButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  nameInput.value = currentUserData.name;
  aboutInput.value = currentUserData.about;
});

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

 profileName.textContent = nameInput.value;

  console.log("save button");

 profileDescription.textContent =
    aboutInput.value;

  popup.classList.remove("popup_opened");
});


