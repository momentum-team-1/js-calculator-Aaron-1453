class Calculator {
  //the class will be the blueprints of the calculator, this will give the instructions to the rest of the document about what I want my calculator to do.
  constructor(previousOperandTextElement, currentOperandTextElement) {
    //these will be the things i will be working on, they will take all the parameters i want to put on my calculator
    (this.previousOperandTextElement = previousOperandTextElement),
      (this.currentOperandTextElement = currentOperandTextElement);

    this.clear(); //to clear values when you start
  }

  clear() {
    this.currentOperand = ""; //what is defined by the bigger number in output box
    this.previousOperand = ""; //what is defined by the smaller number on top in output box
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand
      .toString() // convert the number to a string so i can slice it
      .slice(0, -1); //new concept: get the very last member of the string and chop it off, go from index 0 all the way from one from the end
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return; //we don't want the period to be repeatable, so this means if the number is a . and it already has one, return (stop the function completely). this is something new that I learned for sure.
    this.currentOperand = this.currentOperand.toString() + number.toString(); //convert these to strings so that 1+1 = 2 and not 1+1 = 11
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return; //this says if there is nothing in the current operand box then don't go any further in the code (in this case don't clear the thing you passed into the second operand box)
    //pass the text from the current to the previous operand and display it in that box, and clears out current operand
    if (this.previousOperand !== " ") {
      // if there's something in the previousoperand (meaning the top slot) slot do the computation, if there's nothing do the normal thing
      this.compute();
    }
    this.operation = operation; //set this.operation to the operation we passed in
    this.previousOperand = this.currentOperand; //we are done typing the current number so we move the current operation to the previous one
    this.currentOperand = " "; //clear out the value now that it's been sent to the previous operand box
  }

  compute() {
    let computation; //this will be the result of the compute function
    const previous = parseFloat(this.previousOperand); //the actual number version of previousOperand, converts it from a string to a number again
    const current = parseFloat(this.currentOperand); //same thing here
    if (isNaN(previous) || isNaN(current)) return; //if they don't enter anything and click equal, don't run anything
    switch (
      this.operation //like a lot of if statements chained after each other, on a single object
    ) {
      case "+": //if this.operation is a plus, do the below thing, which is plus
        computation = previous + current;
        break; //stop it here
      case "-": //if this.operation is a minus, do the below thing, which is minus
        computation = previous - current;
        break; //stop it here
      case "*": //if this.operation is a multiply, do the below thing, which is multiply
        computation = previous * current;
        break; //stop it here
      case "/": //if this.operation is a divide, do the below thing, which is divide
        computation = previous / current;
        break; //stop it here
      default:
        //else statement, anytime none of these is executed, do this
        return; //blank return, just don't do anything
    }
    this.currentOperand = computation; // currentoperand box gets the result of this computation
    this.operation = undefined;
    this.previousOperand = " "; //empties out previous operand box
  }

  updateDisplay() {
    //update the display to show the numbers on the operands. confusingly written but it is what it is.
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator( //instantiates a new version of the calculator so we can work with it
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay(); //now when we click equals it calls the compute function
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay(); //now when we click clear it calls the clear button and updates the display
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay(); //now when we click clear it calls the clear button and updates the display
});

//few things i could do if i had more time: make the operations symbol go up to the previous operand box
//put in commas and punctation in between the computation results
