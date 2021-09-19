class CalcController {
  constructor() {
    this._lastOperator = ''
    this._lastNumber = ''

    this._operation = []
    this._locale = 'pt-BR'
    this._displayCalcEl = document.querySelector('#display')
    this._dateEl = document.querySelector('#data')
    this._timeEl = document.querySelector('#hora')
    this._currentDate
    this.initialize()
    this.initButtonsEvents()
    this.initKeyboardEvents()
    this.setLastNumberToDisplay()
  }

  pasteFromKeyboard() {
    document.addEventListener('paste', e => {
      let text = e.clipboardData.getData('Text')
      this.displayCalc = parseFloat(text)
    })
  }

  copyToClipboard() {
    let input = document.createElement('input')

    input.value = this.displayCalc

    document.body.appendChild(input)

    input.select() //Comando usado para selecionar dinamicamente um elemento, neste caso, um elemento input.

    document.execCommand('Copy')
    input.remove()
  }

  initialize() {
    this.setDisplayDateTime()
    setInterval(() => {
      //Usando o setInterval() para fazer com que a data e hora atualizem de forma intermitente.
      this.setDisplayDateTime()
    }, 1000)

    this.pasteFromKeyboard()
  }

  initKeyboardEvents() {
    document.addEventListener('keydown', event => {
      switch (event.key) {
        //Operações da calculadora

        case 'Escape':
          this.clearAll()
          break

        case 'Backspace':
          this.clearEntry()
          break

        case '+':
        case '-':
        case '/':
        case '*':
        case '%':
          this.addOperation(event.key)
          break

        case 'Enter':
        case '=':
          this.calc()
          break

        case '.':
        case ',':
          this.addDot()
          break

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.addOperation(parseInt(event.key))
          break

        case 'c':
          if (event.ctrlKey) this.copyToClipboard()
      }
    })
  }

  //Método que adiciona varios eventos em um elemento.
  addEventListenerAll(element, events, fn) {
    /* console.log(eventsArr); */
    events.split(' ').forEach((value, index) => {
      element.addEventListener(value, fn, false)
    })
  }

  clearAll() {
    this._operation = []
    this._lastNumber = ''
    this._lastOperator = ''

    this.setLastNumberToDisplay()
  }

  //Método que limpa a entrada atual do usuário.
  clearEntry() {
    //O método Array.pop() remove o último elemento do array. No caso da calculadora, o botão Clear Entry apaga a entrada atual do usuario.
    this._operation.pop()

    this.setLastNumberToDisplay()
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1]
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value
  }

  isOperator(value) {
    //Foi criado um array com os operadores para verificar se o ultimo elem. digitado é um operador. Se o método retornar alguma posição, é porque foi passado algum operador. Se o método indexOf() retornar -1, significa que o valor passado não foi encontrado no array.

    return ['+', '-', '*', '%', '/'].indexOf(value) > -1
  }

  pushOperation(value) {
    this._operation.push(value)

    if (this._operation.length > 3) {
      this.calc()
    }
  }

  getResult() {
    return eval(this._operation.join(''))
  }

  calc() {
    let last = ''

    this._lastOperator = this.getLastItem()

    if (this._operation.length < 3) {
      let firstItem = this._operation[0]
      this._operation = [firstItem, this._lastOperator, this._lastNumber]
    }

    if (this._operation.length > 3) {
      last = this._operation.pop()
      this._lastNumber = this.getResult()
    } else if (this._operation.length == 3) {
      this._lastNumber = this.getLastItem(false)
    }

    //last = this._operation.pop();   //Retira o ultimo elemento e guarda o valor na variável.
    let result = this.getResult()

    if (last == '%') {
      result /= 100
      this._operation = [result]
    } else {
      this._operation = [result]

      if (last) this._operation.push(last)
    }

    this.setLastNumberToDisplay()
  }

  getLastItem(isOperator = true) {
    let lastItem

    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (this.isOperator(this._operation[i]) == isOperator) {
        lastItem = this._operation[i]
        break
      }
    }

    if (!lastItem) {
      lastItem = isOperator ? this._lastOperator : this._lastNumber
    }

    return lastItem
  }

  setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false)

    if (!lastNumber) lastNumber = 0

    this.displayCalc = lastNumber
  }

  addOperation(value) {
    /* if (isNaN(value)) {
            this._operation.push(value);
            console.log(this._operation);
            return;
        }

        if (this._operation.length === 0 || isNaN(this.getLastOperation())) {
            this._operation.push(String(value));
            console.log(this._operation);
            return;
        }

        this.getLastOperation() += value;
        console.log(this._operation); */

    if (isNaN(this.getLastOperation())) {
      //Neste caso, se for um numero, irá retornar false.

      if (this.isOperator(value)) {
        this.setLastOperation(value)
        //this._operation.push(value);
      } else {
        this.pushOperation(value)
        this.setLastNumberToDisplay()
      }
    } else {
      //Number
      if (this.isOperator(value)) {
        this.pushOperation(value)
      } else {
        let newValue = this.getLastOperation().toString() + value.toString()
        this.setLastOperation(newValue)

        this.setLastNumberToDisplay()
      }
    }
  }

  setError() {
    this.displayCalc = 'Error'
  }

  addDot() {
    let lastOperation = this.getLastOperation()

    if (
      typeof lastOperation === 'string' &&
      lastOperation.split('').indexOf('.') > -1
    )
      return

    if (this.isOperator(lastOperation) || !lastOperation) {
      this.pushOperation('0.')
    } else {
      this.setLastOperation(lastOperation.toString() + '.')
    }

    this.setLastNumberToDisplay()
  }

  execBtn(value) {
    switch (value) {
      //Operações da calculadora

      case 'ac':
        this.clearAll()
        break

      case 'ce':
        this.clearEntry()
        break

      case 'soma':
        this.addOperation('+')
        break

      case 'subtracao':
        this.addOperation('-')
        break

      case 'divisao':
        this.addOperation('/')

        break

      case 'multiplicacao':
        this.addOperation('*')

        break

      case 'porcento':
        this.addOperation('%')
        break

      case 'igual':
        this.calc()
        break

      case 'ponto':
        this.addDot()
        break

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value))
        break

      default:
        this.setError()
        break
    }
  }

  initButtonsEvents() {
    //Selecionando os botões da calculadora pela a classe
    let buttons = document.querySelectorAll('#buttons > g, #parts > g')

    //Precisamos usar um laço para percorrer os botões, pois selecionamos usando o querySelectorAll, o retorno é uma node list, semelhante a um array.
    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, 'click drag', e => {
        let textBtn = btn.className.baseVal.replace('btn-', '')

        this.execBtn(textBtn)
      })

      this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
        btn.style.cursor = 'pointer'
      })
    })
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
  }

  //Getters and setters

  get displayTime() {
    return this._timeEl.innerHTML
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value
  }

  get displayDate() {
    return this._dateEl.innerHTML
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value
  }

  get currentDate() {
    return new Date()
  }

  set currentDate(value) {
    this._currentDate = value
  }
}
