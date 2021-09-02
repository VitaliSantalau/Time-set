import Clock from './clock.js';

export default class TimezoneMechClock extends Clock {

  constructor(tz) {
    super();
    this.tz = tz;
  }
  
  get template() {
    return `
      <div class="timezone-mech-clock">
        <div class="timezone-mech-clock__center"></div>
        <div class="timezone-mech-clock__second" data-element="second"></div>
        <div class="timezone-mech-clock__minute" data-element="minute"></div>
        <div class="timezone-mech-clock__hour" data-element="hour"></div>
      </div>
    `;
  }

  getCurrentMoment() {
    super.getCurrentMoment();
    this.timezoneHour = this.current.toLocaleTimeString('ru-RU', { timeZone: this.tz, hour: 'numeric' });
    this.hours = this.timezoneHour;
  }

  renderSecond() {
    const rotation = this.seconds / 60 * 360 + 180;
    const { second } = this.subElements;
    second.style.transform = `rotate(${rotation}deg)`;
  }

  renderMinute() {
    const rotation = this.minutes/60*360 + this.seconds/60*6 + 180;
    const { minute } = this.subElements;
    minute.style.transform = `rotate(${rotation}deg)`;
  }

  renderHour() {   
    const rotation = this.hours/12*360 + this.minutes/60*30 + 180;
    const { hour } = this.subElements;
    hour.style.transform = `rotate(${rotation}deg)`;
  }
}