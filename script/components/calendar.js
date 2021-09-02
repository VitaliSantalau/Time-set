export default class Calendar {
  element;
  subElements;
  
  constructor() {
    this.current = new Date();
    this.currentYear = this.current.getFullYear();
    this.currentMonth = this.current.getMonth();
    this.currentDay = this.current.getDate();
    this.monthToShow = this.current;
    
    this.render();
  }

  get template() {
    return `
    <div class="calendar">
      <div class="calendar-header row">
        <div class="calendar-header__date" data-element="date"></div>
        <div class="container-arrow row">
          <div class="calendar-header__arrow-left" data-element="arrowLeft"><</div>
          <div class="calendar-header__arrow-right" data-element="arrowRight">></div>
        </div>
      </div>
      <div class="calendar-main">
        <div class="calendar-day-of-week">
          <div>mo</div>
          <div>tu</div>
          <div>we</div>
          <div>th</div>
          <div>fr</div>
          <div>sa</div>
          <div>su</div>
        </div>
        <div class="calendar-grid-days" data-element="gridDays"></div>
      </div>
    </div>`;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);

    this.initEventsListeners();
    this.renderDate();
    this.renderDays();
  }

  getSubElements(element) {
    const subElementsNodeList = element.querySelectorAll('[data-element]');
    return [...subElementsNodeList].reduce((obj, subElement) => {
      obj[subElement.dataset.element] = subElement;
      return obj;
    }, {});
  }

  renderDate() {
    const showDate = this.monthToShow.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    const { date } = this.subElements;
    date.textContent = showDate;
  }

  renderDays() {
    const year = this.monthToShow.getFullYear();
    const month = this.monthToShow.getMonth();
    const daysInMonth = () => {
      return new Date(year, month + 1, 0).getDate();
    };
    
    const days = [];
    for (let i = 1; i <= daysInMonth(); i++) {
      days.push({
        number: i,
      });
    };
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();
    days[0].dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    const { gridDays } = this.subElements;
    gridDays.innerHTML = `
      ${days.map(day => this.renderDay(day)).join('')}
    `;
  }

  renderDay(day) {
    const addStartColumn = (day) => {
      if(day.dayOfWeek) { 
        return `style = "--start-from: ${day.dayOfWeek}"`;
      }
    };

    const addStyleCurrent = (day) => {
      if(this.monthToShow.getFullYear() === this.currentYear &&
         this.monthToShow.getMonth() === this.currentMonth &&
         day.number === this.currentDay) {
        return `class="calendar__current-day"`
      }
    };

    return `
      <div ${addStyleCurrent(day)} ${addStartColumn(day)}>
        ${day.number}
      </div>
    `;
  }

  initEventsListeners() {
    const { arrowLeft, arrowRight } = this.subElements;

    arrowLeft.addEventListener('pointerdown', () => this.toLeftMonth());
    arrowRight.addEventListener('pointerdown', () => this.toRightMonth());
  }

  toLeftMonth() {
    this.monthToShow.setMonth(this.monthToShow.getMonth() - 1);
    this.renderDate();
    this.renderDays();
  }
    
  toRightMonth() {
    this.monthToShow.setMonth(this.monthToShow.getMonth() + 1);
    this.renderDate();
    this.renderDays();
  }  
}