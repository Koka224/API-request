const apiUrl = "https://api.agify.io/";
const nameInputField = document.getElementById("name-input");
const resultTable = document.getElementById("result-table");
const errorContainer = document.getElementById("error-container");
const loader = document.getElementById("loader");
const refetchButton = document.getElementById("refetch-button");

async function fetchData() {
  const nameInput = nameInputField.value;

  try {
    if (!nameInput) {
      throw new Error("Введите иммя.");
    }

    loader.style.display = "block";

    refetchButton.setAttribute("disabled", true);

    const response = await fetch(`${apiUrl}?name=${nameInput}`);
    const data = await response.json();

    loader.style.display = "none";
    refetchButton.removeAttribute("disabled");
    errorContainer.textContent = "";
    renderTable(data);
  } catch (error) {
    loader.style.display = "none";
    refetchButton.removeAttribute("disabled");
    errorContainer.textContent = error.message || "Oops! Something went wrong.";
  }
}

function renderTable(data) {
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  for (const key in data) {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  const dataRow = document.createElement("tr");
  for (const key in data) {
    const td = document.createElement("td");
    td.textContent = data[key];
    dataRow.appendChild(td);
  }

  table.appendChild(dataRow);

  resultTable.innerHTML = "";
  resultTable.appendChild(table);
}

refetchButton.addEventListener("click", fetchData);

nameInputField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    fetchData();
  }
});

fetchData();
