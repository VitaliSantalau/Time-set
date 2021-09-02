export default class Clock {
  element;
  subElements;
  current;
  seconds;
  minutes;
  hours;
    
  constructor() {
    this.render();
    this.start();
  }

  get template() {}

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const subElementsNodeList = element.querySelectorAll('[data-element]');
    return [...subElementsNodeList].reduce((obj, subElement) => {
      obj[subElement.dataset.element] = subElement;
      return obj;
    }, {});
  }

  getCurrentMoment() {
    this.current = new Date();
    this.seconds = this.current.getSeconds();
    this.minutes = this.current.getMinutes();
    this.hours = this.current.getHours();
  }

  renderSecond() {}

  renderMinute() {}

  renderHour() {}

  tic() {
    this.getCurrentMoment();
    this.renderSecond();
    this.renderMinute();
    this.renderHour();
  }

  start() {
    this.tic(); 
    this.timerId = setInterval(() => this.tic(), 1000); 
  }

  stop() {
    clearInterval(this.timeId);
  }
}