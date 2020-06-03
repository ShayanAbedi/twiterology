// select elements
const form = document.querySelector("form");
const spinner = document.querySelector(".spinner");

spinner.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form); // get the values entered to the form
  const twer = {
    name: formData.get("name"), // get the name in the formData object
    message: formData.get("message"), // get the message in the formData object
  };
  spinner.style.display = "";
});
