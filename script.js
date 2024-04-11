document.addEventListener("DOMContentLoaded", function () {

  const selecto = document.querySelector("#checkbox");
  const button = document.querySelector("#button");


  function disableButton() {
    button.setAttribute("disabled", "disabled");
  }

  function enableButton() {
    button.removeAttribute("disabled");
  }

  selecto.addEventListener("change", function (event) {
    const selectedOption = event.target;
    if (selectedOption.checked) {
      enableButton();
    } else {
      disableButton();
    }
  });
});
