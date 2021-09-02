import Clock from './clock.js';

export default class DigitClock extends Clock {

  constructor(tz) {
    super();
    this.tz = tz;
  }
  
  get template() {
    return `
      <div class="digit-clock">
        <div class="digit-clock__screen" data-element="screen"></div> 
      </div>
    `;
  }

  renderScreen() {
    const { screen } = this.subElements;
    screen.textContent = this.time; 
  }

  getCurrentMoment() {
    this.current = new Date();
    this.time = this.current.toLocaleTimeString('ru-RU', { timeZone: this.tz });
  }

  tic() {
    this.getCurrentMoment();
    this.renderScreen();
  }
}