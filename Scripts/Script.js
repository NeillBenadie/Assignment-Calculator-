const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear]')
const screenValueText = document.querySelector('[data-screen]')
let savedValueText;

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.anotherNumber(button.innerText);
		calculator.updateScreen();
	})
})
operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chosenOperation(button.innerText);
		calculator.updateScreen();
	})
})
equalsButton.addEventListener('click', button => {
	calculator.operate();
	calculator.updateScreen();
}) 
allClearButton.addEventListener('click', button => {
	calculator.clearAll();
	calculator.updateScreen();
}) 
deleteButton.addEventListener('click', button => {
	calculator.removeOne();
	calculator.updateScreen();
})

class Calculator {
	constructor(savedValueText, screenValueText) {
		this.savedValueText = savedValueText;
		this.screenValueText = screenValueText;
	  	this.clearAll();
	}

	clearAll() {
		this.screenValue = '';
		this.savedValue = '';
		this.operation = undefined;
	}
	removeOne() {
		this.screenValue = this.screenValue.toString().slice(0, -1);
	}
	anotherNumber(number) {
		if (number === '0' && this.screenValue.toString() ==='0') return; //stops the function if the user wants to spam '0' from the start
		if (number === '.' && this.screenValue.includes('.')) return; //stops the function if there is already '.' in
		if (Object.keys(this.screenValue).length > 23) return; //stops the user from typing a number that goes past screen borders
		this.screenValue = this.screenValue.toString() + number.toString();	
	}
	chosenOperation(operation) {
		if (operation === '+' || '-' || '*' || '%' || '-' || '/'){ //Changes the operation if a different operation is clicked.
			this.operation = operation;
		}
		if(this.screenValue === '') return
		if(this.savedValue !== ''){
			this.operate();	
		}
		this.savedValue = this.screenValue; //done with the number
		this.screenValue = '';
	}

	add(previous,current){
		if(previous == 9 && current == 10){ //little cringey meme
			return 21; 
		}else{
			return  previous + current;
		}
	}
	minus(previous,current){
		return previous - current;
	}
	multiply(previous,current){
		return previous * current;
	}
	remainder(previous,current){
		return previous % current;
	}
	devide(previous,current){
		if(previous / current == Infinity){
			return "Lol, no" //snarky answer for division by 0
		}else{
			return previous / current;
		}
	}

	updateScreen() {
		this.screenValueText.innerText = this.screenValue;
	}
	
	operate() {
		let equation;
		const previous = parseFloat(this.savedValue);
		const current = parseFloat(this.screenValue);
		if (isNaN(previous) || isNaN(current)) return
		switch (this.operation) {
			case '+':
				equation = this.add(previous,current)
			  	break
			case '-':
				equation = this.minus(previous,current)
			  	break
			case '*':
				equation = this.multiply(previous,current)
			  	break
			case '%':
				equation = this.remainder(previous,current)
		  		break  
			case '/':
				equation = this.devide(previous,current)
				break;
			default:
				return;
		}
		if(equation != "Lol, no"){
			if (Number(equation) === equation && equation % 1 !== 0){ //Displaying the number like a decimal by 6 zeros after the comma when its a decimal or displaying like a int when its an Int.
				this.screenValue = equation.toFixed(6);					
			}else{
				this.screenValue = equation;
			}	
		}else{
			this.screenValue = equation;
		}
		this.operation = undefined;
		this.savedValue = '';
	}
}  
const calculator = new Calculator(savedValueText,screenValueText);
  
  




