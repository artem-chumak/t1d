// LOGIC FOR COUNTRIES AND STATES

let countries = [];

const optionTemplate = document.getElementById("temp-option");

const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");

function addOption(select, value, text) {
  const option = optionTemplate.content
    .cloneNode(true)
    .querySelector(".option");
  option.value = value;
  option.textContent = text;
  select.appendChild(option);
}

// F countries

function fetchCoutries() {
  const headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "RjYxRnFUTU5nZE9yVVhlN0ZKME10TEJhZUFpcVB6Nk5xWkQyRFgzMQ=="
  );

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      countries = result;
      countries.forEach((country) => {
        addOption(countrySelect, country.iso2, country.name);
      });
    })
    .catch((error) => console.log("error", error));
}

// F states

function fetchStates(countryCode) {
  const headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "RjYxRnFUTU5nZE9yVVhlN0ZKME10TEJhZUFpcVB6Nk5xWkQyRFgzMQ=="
  );

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  fetch(
    `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
    requestOptions
  )
    .then((response) => response.json())
    .then((states) => {
      stateSelect.innerHTML = "";
      const defaultOption = new Option("state", "");
      defaultOption.disabled = true;
      defaultOption.selected = true;
      stateSelect.appendChild(defaultOption);
      if (states.length === 0) {
        stateSelect.disabled = true;
      } else {
        stateSelect.disabled = false;
      }
      states.forEach((state) => {
        const option = new Option(state.name, state.iso);
        stateSelect.appendChild(option);
      });
    })
    .catch((error) => console.log("error", error));
}

document.addEventListener("DOMContentLoaded", function () {
  fetchCoutries();

  countrySelect.addEventListener("change", function () {
    const countryCode = this.value;
    fetchStates(countryCode);
  });
});

// LOGIC FOR FIRST AND SECOND PARTS OF FORM

document.addEventListener("DOMContentLoaded", function () {
  const partOne = document.querySelector(".form-block-one");
  const partTwo = document.querySelector(".form-block-two");
  const btnContinue = document.querySelector("#button-continue");

  btnContinue.addEventListener("click", function () {
    partOne.classList.add("hidden");
    partTwo.classList.remove("hidden");
  });
});

// STANDARTS

document.addEventListener("DOMContentLoaded", function() {
  const standardInput = document.getElementById("standard");
  const metricInput = document.getElementById("metric");

  function showMessage() {
    const heightOneInput = document.getElementById("height-one");
    const heightTwoInput = document.getElementById("height-two");
    const weightInput = document.getElementById("weight");

    if (standardInput.checked) {
      heightOneInput.placeholder = "foot";
      heightTwoInput.placeholder = "inch";
      weightInput.placeholder = "pound";
    } else if (metricInput.checked) {
      heightOneInput.placeholder = "meter";
      heightTwoInput.placeholder = "santimetr";
      weightInput.placeholder = "kilogramm";
    }
  }

  standardInput.addEventListener("change", showMessage);
  metricInput.addEventListener("change", showMessage);
});
