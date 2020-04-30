const calculator = document.querySelector(".display-screen");
calculator.textContent = "statement";
for (button of document.querySelectorAll(".calc-button"))
  button.addEventListener("click", function (event) {
    calculator.textContent += event.target.textContent;
  });
