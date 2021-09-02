import DigitClock  from './digitclock.js';
import TimezoneMechClock  from './timezoneMechClock.js';

export default class TimezonesField {

  timezones = {
    "New York": "America/New_York",
    "London": "Europe/London",
    "Berlin": "Europe/Berlin",
    "Moscow": "Europe/Moscow",
    "Tokyo": "Japan",
  }

  constructor() {
    this.render();
  }
     
  render() {
    const element = document.createElement('div');
    element.innerHTML = `<div class="timezones-field"></div>`;
    this.element = element.firstElementChild;
   
    this.renderTimezones();
  }

  renderTimezones() {
    Object.entries(this.timezones).map(([town, tz]) => {
      const subElement = document.createElement('div');
      const digitClock = new DigitClock(tz);
      const mechClock = new TimezoneMechClock(tz);
      subElement.innerHTML = `
        <div class="timezone-container row">
          <div class="timezone__mech-clock"></div>
          <div class="">
            <div class="timezone__town">${town}</div>
            <div class="timezone__digit-clock"></div>
          </div>
        </div>`
      subElement.firstElementChild.querySelector('.timezone__digit-clock').append(digitClock.element);
      subElement.firstElementChild.querySelector('.timezone__mech-clock').append(mechClock.element);
            
      this.element.append(subElement.firstElementChild);
    }).join('');
  }
}