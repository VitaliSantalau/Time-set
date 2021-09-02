export default class CustomDate {
  element;
  current;
  day;
  date;
      
  constructor() {
    this.getCurrentDate();
    this.render();
  }

  get template() {
    return `
      <div class="custom-date">
        <div class="custom-date__day-of-week">
          ${this.day}
        </div>
        <div class="custom-date__full-date">
          ${this.date}
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  getCurrentDate() {
    this.current = new Date();
    this.day = this.current.toLocaleDateString('en-US', { weekday: 'long'});
    this.date = this.current.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}