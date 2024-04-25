// LOGIC FOR COUNTRIES AND STATES

document.addEventListener("DOMContentLoaded", function () {
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
        const defaultOption = new Option("State*", "");
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
				const stateSelecto = document.getElementById("state");
				stateSelecto.classList.remove('selected');
      })
      .catch((error) => console.log("error", error));
  }

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
  const form = document.querySelector(".form");

  btnContinue.addEventListener("click", function () {
    const formData = new FormData(form);

    const formDataObject = {};
    formData.forEach((value, key) => {
      if (formDataObject[key]) {
        if (!Array.isArray(formDataObject[key])) {
          formDataObject[key] = [formDataObject[key]];
        }
        formDataObject[key].push(value.trim());
      } else {
        formDataObject[key] = value.trim();
      }
    });

    // console.log(formDataObject);

    // ages error
    const ages = formDataObject["ages"];
    const errorAges = document.querySelector(".error-ages");
    if (!ages) {
      errorAges.classList.remove("hidden");
    } else {
      errorAges.classList.add("hidden");
    }

    // sex error
    const sex = formDataObject["sex"];
    const errorSex = document.querySelector(".error-sex");
    if (!sex) {
      errorSex.classList.remove("hidden");
    } else {
      errorSex.classList.add("hidden");
    }

    // eth
    const eth = formDataObject["ethnicity"];
    const errorEth = document.querySelector(".error-eth");
    if (!eth) {
      errorEth.classList.remove("hidden");
    } else {
      errorEth.classList.add("hidden");
    }

    // type
    const type = formDataObject["mesure-type"];
    const errorType = document.querySelector(".error-type");
    if (!type) {
      errorType.classList.remove("hidden");
    } else {
      errorType.classList.add("hidden");
    }

    // height
    const heightOne = formDataObject["height-one"];
    const heightTwo = formDataObject["height-two"];
    const errorHeight = document.querySelector(".error-height");
    if (!heightOne || !heightTwo) {
      errorHeight.classList.remove("hidden");
    } else {
      errorHeight.classList.add("hidden");
    }

    // weight
    const weight = formDataObject["weight"];
    const errorWeight = document.querySelector(".error-weight");
    if (!weight) {
      errorWeight.classList.remove("hidden");
    } else {
      errorWeight.classList.add("hidden");
    }

    if (ages && eth && heightOne && heightTwo && type && sex && weight) {
      partOne.classList.add("hidden");
      partTwo.classList.remove("hidden");
			window.scrollTo(0, 0);
    }
  });
});

// STANDARTS

document.addEventListener("DOMContentLoaded", function () {
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


// Select color logic

document.addEventListener("DOMContentLoaded", function() {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

  countrySelect.addEventListener("change", function() {
    if (countrySelect.value === "") {
      countrySelect.classList.remove("selected");
    } else {
      countrySelect.classList.add("selected");
    }
  });

  stateSelect.addEventListener("change", function() {
    if (stateSelect.value === "") {
      stateSelect.classList.remove("selected");
    } else {
      stateSelect.classList.add("selected");
    }
  });
});

// SUB BTN

document.addEventListener("DOMContentLoaded", function() {
  const buttonSubmit = document.getElementById("button-sub");
  const form = document.querySelector("form");

  buttonSubmit.addEventListener("click", function(event) {

		event.preventDefault();

    const formData = new FormData(form);

    const formDataObject = {};
    formData.forEach((value, key) => {
      if (formDataObject[key]) {
        if (!Array.isArray(formDataObject[key])) {
          formDataObject[key] = [formDataObject[key]];
        }
        formDataObject[key].push(value.trim());
      } else {
        formDataObject[key] = value.trim();
      }
    });

		// console.log(formDataObject)

		// name
		const name = formDataObject["name"];
		const errorName = document.querySelector(".error-name");
		if (!name) {
			errorName.classList.remove("hidden");
		} else {
			errorName.classList.add("hidden");
		}

		// last-name
		const lastName = formDataObject["last-name"];
		const errorLastName = document.querySelector(".error-last-name");
		if (!lastName) {
			errorLastName.classList.remove("hidden");
		} else {
			errorLastName.classList.add("hidden");
		}

		// address
		const address = formDataObject["address"];
		const errorAddress = document.querySelector(".error-address");
		if (!address) {
			errorAddress.classList.remove("hidden");
		} else {
			errorAddress.classList.add("hidden");
		}

		// city
		const city = formDataObject["city"];
		const errorCity = document.querySelector(".error-city");
		if (!city) {
			errorCity.classList.remove("hidden");
		} else {
			errorCity.classList.add("hidden");
		}

		// zip
		const zip = formDataObject["zip"];
		const errorZip = document.querySelector(".error-zip");
		if (!zip) {
			errorZip.classList.remove("hidden");
		} else {
			errorZip.classList.add("hidden");
		}

		// country
		const country = formDataObject["country"];
		const errorCountry = document.querySelector(".error-country");
		if (!country) {
			errorCountry.classList.remove("hidden");
		} else {
			errorCountry.classList.add("hidden");
		}

		// state
		const state = formDataObject["state"];
		const errorState = document.querySelector(".error-state");
		const stateSelect = document.getElementById("state");
		const isStateFalse = !state && stateSelect.length > 1;

		if (isStateFalse) {
			errorState.classList.remove("hidden");
		} else {
			errorState.classList.add("hidden");
		}

		// FULL ABJECT LOGIC

		if (!isStateFalse && country && zip && city && address && lastName && name) {
      alert('redy to send  >>> formDataObject <<<')
			console.log(formDataObject)
    }

  });

});
