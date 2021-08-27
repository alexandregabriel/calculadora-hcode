class CalcController {

    constructor(){
        
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval(() => {
            //Usando o setInterval() para fazer com que a data e hora atualizem de forma intermitente.
            this.setDisplayDateTime();
        }, 1000);
        
    }

    //Método que adiciona varios eventos em um elemento.
    addEventListenerAll(element, events, fn){
        /* console.log(eventsArr); */
        events.split(' ').forEach((value, index) => {
            element.addEventListener(value, fn, false);
        });
    }

    initButtonsEvents(){

        //Selecionando os botões da calculadora pela a classe
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //Precisamos usar um laço para percorrer os botões, pois selecionamos usando o querySelectorAll, o retorno é uma node list, semelhante a um array.
        buttons.forEach((btn, index)=> {
            this.addEventListenerAll(btn, 'click drag', e => {
                console.log(btn.className.baseVal.replace('btn-',''));
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            })

        });

    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    
    
    //Getters and setters


    get displayTime(){
        return this._timeEl.innerHTML;
    }
    
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}