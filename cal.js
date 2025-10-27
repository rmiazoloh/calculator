// Constants and Configuration
const OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
};

const CALCULATOR_INPUT = {
    ALLOWED_DIGITS: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
    ALLOWED_OPERATORS: ['+', '-', '*', '/']
}

const ERROR_MESSAGES = {
    DIVISION_BY_ZERO: 'Cannot divide by 0',
    INVALID_INPUT: 'Your operation should use only numbers',
    PREMATURE_EQUALS: 'You should enter the operation (at least two numbers and the sign) before clicking the equal button'
};

// Classe Calculator : gère la logique de la calculette
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.isFloat = false;
        this.isShouldResetScreen = false;
        this.history = '';
    }
    
    reset(){
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.history = '';
    }
    
    addDigits(value){
        if(value === '.'){
            this.isFloat = true;
        }
        if(this.currentValue === '0' || this.isShouldResetScreen){
            this.currentValue = value;
            this.isShouldResetScreen = false;
            
            // Réinitialiser l'historique si on commence un nouveau calcul
            // après un résultat (quand operation est null)
            if(this.operation === null) {
                this.history = value;
            } else {
                this.history += ` ${value}`;
            }
        }else{
            this.currentValue += value;
            this.history += value;  // Ajouter juste le chiffre, pas currentValue
        }
    }
    deleteLastInput(){
        const lastChar = this.currentValue.substring(this.currentValue.length-1);
        const lastCharHistory = this.history.substring(this.history.length-1);
        const valueAfterDelete = this.currentValue.substring(0, this.currentValue.length-1);
        const valueHistoryAfterDelete = this.history.substring(0, this.history.length-1);

        if (lastChar === '.'){
            this.isFloat = false;
        }

        if (['+', '-', '/', '*'].some(op => lastCharHistory === op)){
            this.operation = null;
            this.history = valueHistoryAfterDelete;
            return;
        }
        this.currentValue = valueAfterDelete;
        this.history = valueHistoryAfterDelete;
    }
    
    calculate(){
        if (this.operation === null || this.previousValue === ''){
            this.currentValue = ERROR_MESSAGES.PREMATURE_EQUALS;
            this.isShouldResetScreen = true;
            this.isFloat = false;
            this.history = '';
            return;
        }
        
        let b = 0;
        let a = 0;
        if (this.currentValue.includes('.') || this.previousValue.includes('.')){
            b = parseFloat(this.currentValue);
            a = parseFloat(this.previousValue);
            console.log(a +'+'+ b)

        }else {
            b = parseInt(this.currentValue);
            a = parseInt(this.previousValue);
        }

        if (b === 0 && this.operation === '/'){
            this.currentValue = ERROR_MESSAGES.DIVISION_BY_ZERO;
            this.isShouldResetScreen = true;
            this.operation = null;
            this.isFloat = false;
            this.history = '';
        }else {
            const result = OPERATORS[this.operation](a, b);
            
            // Construire l'historique avec l'opération complète et le résultat
            this.history = `${a} ${this.operation} ${b} = ${result}`;
            
            this.currentValue = result.toString();
            this.previousValue = '';
            this.operation = null;
            this.isShouldResetScreen = true;
            this.isFloat = false;
        }
    }
    
    setOperation(op){
        // Réinitialiser l'historique au début d'un nouveau calcul
        if (this.isShouldResetScreen && this.operation === null) {
            this.history = '';
        }
        
        if (this.operation !== null && !this.isShouldResetScreen){
            this.calculate();
        }
        // Ajouter à l'historique
        this.history = `${this.currentValue} ${op}`;
        
        this.previousValue = this.currentValue;
        this.operation = op;
        this.isShouldResetScreen = true;
        this.isFloat = false;
    }
    
    getDisplay(){
        return this.currentValue;
    }
    getHistory(){
        return this.history;
    }
    getIsFloat(){
        return this.isFloat;
    }
}

class CalculatorUI {
    constructor(calculator){
        this.calculator = calculator;
        // DOM Elements
        this.digitButtons = document.querySelectorAll('.digit');
        this.operateurButtons = document.querySelectorAll('.op');
        this.screen = document.querySelector('.display-primary');
        this.screenHistory = document.querySelector('.display-secondary');
        this.floatButton = document.getElementById('float');
        this.setupEventListeners();
    }
    
    setupEventListeners(){
        // Boutons des chiffres 0-9 (interface)
        this.digitButtons.forEach(button => button.addEventListener('click', () => {
            this.calculator.addDigits(button.innerText);
            this.updateDisplay();
        }));

        // Boutons des opérateurs (interface)
        this.operateurButtons.forEach(operator => operator.addEventListener('click', () => {
            const op = operator.innerText;
            if (op === '='){
                this.calculator.calculate();
            }else if (op === 'clear'){
                this.calculator.reset();
            }else if (op === 'del'){
                this.calculator.deleteLastInput();
            }
            else{
                this.calculator.setOperation(op);
            }
            this.updateDisplay();
        }));

        // Gestion des entrées par le clavier
        window.addEventListener('keydown', (e) => {
            
            if (e.key === '=' || e.key === 'Enter'){
                this.calculator.calculate();
            }
            if (e.key === 'Backspace'){
                this.calculator.deleteLastInput();
            }
            if (CALCULATOR_INPUT.ALLOWED_DIGITS.some(op => e.key === op)){
                this.calculator.addDigits(e.key);
            }

            if (CALCULATOR_INPUT.ALLOWED_OPERATORS.some(op => e.key === op)){
                this.calculator.setOperation(e.key);
            }
            this.updateDisplay();
        });
    }
    
    // Mettre à jour l'affichage
    updateDisplay() {
        this.screen.innerText = this.calculator.getDisplay();
        this.screenHistory.innerText = this.calculator.getHistory();
        if (this.calculator.isFloat === true){
            this.floatButton.disabled = true;
        }else {
            this.floatButton.disabled = false;
        }
    }
}

// Initialiser la calculette quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    const ui = new CalculatorUI(calculator);
    ui.updateDisplay();
})