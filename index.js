const bank = [];
const odds = [];
const evens = [];

function sort() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

function addToBank(number) {
  bank.push(number);
  render();
}

function sortOne() {
  sort();
  render();
}

function sortAll() {
  while (bank.length > 0) {
    sort();
  }
  render();
}

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
  <input name="number" type="number" />
  <button type="submit" data-action="add">Add Number</button>
  <button type="submit" data-action="sortOne">Sort 1</button>
  <button type="submit" data-action="sortAll"> Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;
    if (action === "add") {
      const data = new FormData($form);
      const num = data.get("number");
      if (num) addToBank(+num);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });
  return $form;
}

function NumberInBank(label, numbers) {
  const $section = document.createElement("section");
  $section.classList.add("bank");
  $section.innerHTML = `
    <h2>${label}</h2>
    <output></output>
    `;
  const $spans = numbers.map((num) => {
    const $span = document.createElement("span");
    $span.textContent = num;
    return $span;
  });
  $section.querySelector("output").replaceChildren(...$spans);
  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  if (!$app) return;
  $app.innerHTML = `
      <h1>Odds and Events</h1>
      <div id="form-container"></div>
      <div id="bank-container"></div>
      <div id="odds-container"></div>
      <div id="evens-container"></div>
  `;
  $app.querySelector("#form-container").replaceWith(NumberForm());
  $app.querySelector("#bank-container").replaceWith(NumberInBank("Bank", bank));
  $app.querySelector("#odds-container").replaceWith(NumberInBank("Odds", odds));
  $app
    .querySelector("#evens-container")
    .replaceWith(NumberInBank("Evens", evens));
}
render();
