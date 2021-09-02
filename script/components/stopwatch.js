export default class Stopwatch {
  element;
  subElements;
  current;
  startMoment;
  pastInterval = 0;
  toShowSeconds;
  toShowMinutes;
  toShowHours;

  constructor() {
    this.render();
  }
     
  get template() {
    return `
      <div class="stopwatch">
        <div class="stopwatch-screen">
          <div class="stopwatch-screen__hour" data-element="hour">00</div>
          <div class="stopwatch-screen__colon">:</div>
          <div class="stopwatch-screen__minute" data-element="minute">00</div>
          <div class="stopwatch-screen__colon">:</div>
          <div class="stopwatch-screen__second" data-element="second">00</div>
        </div>
        <div class="stopwatch-button-container">
          <button class="stopwatch__button" data-element="start">start</button>
          <button class="stopwatch__button" data-element="stop">stop</button>
          <button class="stopwatch__button" data-element="reset">reset</button>
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
    const { start, stop, reset } = this.subElements;
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
    this.pastInterval = this.current - this.startMoment;
    this.pastIntervalInSec = Math.round(this.pastInterval / 1000);
    this.toShowHours = Math.floor(this.pastIntervalInSec / 3600);
    this.toShowMinutes = Math.floor(this.pastIntervalInSec / 60) % 60;
    this.toShowSeconds = this.pastIntervalInSec % 60;
    this.renderScreen();
  }

  start() {
    clearInterval(this.stopwatchId);
    this.current = Date.now();
    this.startMoment = this.current - this.pastInterval;
    this.tic();   
    this.stopwatchId = setInterval(() => this.tic(), 500); 
  }

  stop() {
    clearInterval(this.stopwatchId);
  }

  reset() {
    clearInterval(this.stopwatchId);
    this.pastInterval = 0;
    this.toShowSeconds = 0;
    this.toShowMinutes = 0;
    this.toShowSeconds = 0;
    this.renderScreen();
  }
}