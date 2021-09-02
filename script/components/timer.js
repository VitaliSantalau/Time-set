export default class Timer {
  element;
  subElements;
  current;
  startMoment;
  restInterval = 0;
  toShowSeconds;
  toShowMinutes;
  toShowHours;
  prevTarget = {};

  constructor() {
    this.render();
  }
     
  get template() {
    return `
      <div class="timer">
        <div class="timer-set-button-container" data-element="setIntervalContainer">
          <button class="timer__button" value="5">5</button>
          <button class="timer__button" value="10">10</button>
          <button class="timer__button" value="15">15</button>
          <button class="timer__button" value="20">20</button>
          <button class="timer__button" value="30">30</button>
          <button class="timer__button" value="45">45</button>
          <button class="timer__button" value="60">60</button>
          <button class="timer__button" value="90">90</button>
        </div>
        <div class="timer-screen">
          <div class="timer-screen__hour" data-element="hour">00</div>
          <div class="timer-screen__colon">:</div>
          <div class="timer-screen__minute" data-element="minute">00</div>
          <div class="timer-screen__colon">:</div>
          <div class="timer-screen__second" data-element="second">00</div>
        </div>
        <div class="timer-control-button-container">
          <button class="timer__button" data-element="start">start</button>
          <button class="timer__button" data-element="stop">stop</button>
          <button class="timer__button" data-element="reset">reset</button>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.initEventsListeners();
  }

  initEventsListeners() {
    const { start, stop, reset, setIntervalContainer } = this.subElements;
    
    setIntervalContainer.addEventListener('pointerdown', (event) => this.setRestInterval(event));
    start.addEventListener('pointerdown', () => this.start());
    stop.addEventListener('pointerdown', () => this.stop());
    reset.addEventListener('pointerdown', () => this.reset());
  }

  getSubElements(element) {
    const subElementsNodeList = element.querySelectorAll('[data-element]');
    return [...subElementsNodeList].reduce((obj, subElement) => {
      obj[subElement.dataset.element] = subElement;
      return obj;
    }, {});
  }

  correctView(elem) {
    return (elem < 10) ? `0${elem}` : `${elem}`;
  }

  renderSecond() {
    const { second } = this.subElements;
    second.textContent = this.correctView(this.toShowSeconds);
  }

  renderMinute() {
    const { minute } = this.subElements;
    minute.textContent = this.correctView(this.toShowMinutes);
  }

  renderHour() {
    const { hour } = this.subElements;
    hour.textContent = this.correctView(this.toShowHours);
  }

  renderScreen() {
    this.renderSecond();
    this.renderMinute();
    this.renderHour();
  }

  tic() {
    this.current = Date.now();
    this.restInterval = this.startMoment - this.current;
    if(this.restInterval <= 0) this.reset();
    this.restIntervalInSec = Math.round(this.restInterval / 1000);
    this.toShowHours = Math.floor(this.restIntervalInSec / 3600);
    this.toShowMinutes = Math.floor(this.restIntervalInSec / 60) % 60;
    this.toShowSeconds = this.restIntervalInSec % 60;
    
    this.renderScreen();
  }

  setRestInterval(event) {
    let target = event.target;
    let button = target.closest('button');
    if(!button) return;
    
    this.reset();
    target.classList.add("timer__chosen-value");
    this.prevTarget = target;
    
    this.restInterval = target.value*60*1000;
    this.restIntervalInSec = Math.round(this.restInterval / 1000);
    this.toShowHours = Math.floor(this.restIntervalInSec / 3600);
    this.toShowMinutes = Math.floor(this.restIntervalInSec / 60) % 60;
    this.toShowSeconds = this.restIntervalInSec % 60;
    
    this.renderScreen();  
  }

  start() {
    clearInterval(this.timerId);
    this.current = Date.now();
    this.startMoment = this.current + this.restInterval;
    if(this.restInterval) {
      this.tic();   
      this.timerId = setInterval(() => this.tic(), 1000); 
    };
  }

  stop() {
    clearInterval(this.timerId);
  }

  reset() {
    clearInterval(this.timerId);
    this.restInterval = 0;
    this.toShowSeconds = 0;
    this.toShowMinutes = 0;
    this.toShowHours = 0;
    this.renderScreen();
    this.prevTarget.className = "timer__button";
  }
}