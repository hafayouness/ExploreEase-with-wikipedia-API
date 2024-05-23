// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const loader = document.querySelector(".loader");
const resultDisplay = document.querySelector(".results-display");

form.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();

  if (input.value === "") {
    errorMsg.textContent = "woops, veuillez remplir l'input";
    resultDisplay.textContent = "";

    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    resultDisplay.textContent = "";
    wikiApiCall(input.value);
  }
}
async function wikiApiCall(searchInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
      return;
    }
    const data = await response.json();
    createCards(data.query.search);
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createCards(data) {
  if (!data.length) {
    errorMsg.textContent = "woopsy, aucun resultat";
    return;
  }
  data.forEach((el) => {
    const url = `https://en.wikipedia.org/?curid=${el.pagid}`;
    const card = document.createElement("div");
    card.className = "result-item ";
    card.innerHTML = `
    <h3 class="result-title ">
      <a href=${url}  target="_blank">${el.title}</a>
    </h3>
    <a href=${url}  target="_blank" class="result-link ">${url}</a>
    <span class="result-snippet">${el.snippet}</span>
    <br>
    `;
    resultDisplay.appendChild(card);
    loader.style.display = "none";
  });
}
