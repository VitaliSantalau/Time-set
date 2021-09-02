import StopWatch from './components/stopwatch.js';
import Timer from './components/timer.js';
import Calendar from './components/calendar.js';
import SliderBack from './components/sliderBack.js';
import MechClock from './components/mechclock.js';
import DigitClock from './components/digitclock.js';
import CustomDate from './components/customdate.js';
import TimezonesField from './components/timezonesfield.js';

export default class Screen {
  element;
  subElements;
    
  constructor() {
    this.render();
  }

  get template() {
    return `
      <main class="main">
        <h1 class="visually-hidden">Timeset App</h1>
        <aside class="aside-left">
          <section class="stopwatch-container" data-element="stopwatch">
            <h2 class="stopwatch-container__title">Stopwatch</h2> 
          </section>
          <section class="timer-container" data-element="timer">
            <h2 class="timer-container__title">Timer</h2> 
          </section>
          <section class="calendar-container" data-element="calendar">
            <h2 class="visually-hidden">Calendar</h2>
          </section>
        </aside>
        <section class="slider-back-container" data-element="slider">
          <h2 class="visually-hidden">Background slider control </h2>
        </section>
        <aside class="aside-right">
          <section class="digit-clock-container" data-element="digitClock">
            <h2 class="visually-hidden">Digit clock</h2>
          </section>
          <section class="mech-clock-container" data-element="mechClock">
            <h2 class="visually-hidden">Mechanical clock</h2>
          </section>
          <section class="date-container" data-element="date">
            <h2 class="visually-hidden">Current date</h2>
          </section>
          <section class="timezones-field-container" data-element="timezones">
            <h2 class="visually-hidden">World time</h2>
          </section>
        </aside>
      </main>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  
    this.renderComponents();
  }

  getSubElements(element) {
    const subElementsNodeList = element.querySelectorAll('[data-element]');
    return [...subElementsNodeList].reduce((obj, subElement) => {
      obj[subElement.dataset.element] = subElement;
      return obj;
    }, {});
  }

  renderComponents() {
    const { 
      stopwatch,
      timer,
      calendar,
      slider,
      digitClock,
      mechClock,
      date,
      timezones
    } = this.subElements;

    stopwatch.append(new StopWatch().element);
    timer.append(new Timer().element);
    calendar.append(new Calendar().element);
    slider.append(new SliderBack().element);
    digitClock.append(new DigitClock().element);
    mechClock.append(new MechClock().element);
    date.append(new CustomDate().element);
    timezones.append(new TimezonesField().element);
  }
}