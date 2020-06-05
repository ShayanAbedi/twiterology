// API
const API_URL = "http://localhost:8000";
// select elements
const form = document.querySelector("form");
const spinner = document.querySelector(".spinner");
const messages = document.querySelector(".messages");

spinner.style.display = "";
listAllMessages();

const callApi = async (data) => {
  const response = await fetch(`${API_URL}/twer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  form.style.display = "none";
  spinner.style.display = "";
  const formData = new FormData(form); // get the values entered to the form
  const twer = {
    name: formData.get("name"), // get the name in the formData object
    message: formData.get("message"), // get the message in the formData object
  };
  callApi(twer).then((createdMessage) => {
    form.reset(); // reset the form (clear all the entered fields)
    form.style.display = "";
    listAllMessages();
    spinner.style.display = "none";
  });
});

// I cannot use arrow function because I'm calling listAllMessages() before initializing it!
async function listAllMessages() {
  messages.innerHTML = "";
  const response = await fetch(`${API_URL}/twer`);
  const data = await response.json();
  data.reverse();
  data.forEach((d) => {
    const div = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = d.name;

    const p = document.createElement("p");
    p.textContent = d.message;

    const small = document.createElement("small");
    small.textContent = d.created;

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(small);

    messages.appendChild(div);
  });
  spinner.style.display = "none";
}
