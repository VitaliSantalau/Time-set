export default class SliderBack {
  element;
  subElements;
  minAmount = 1;
  maxAmount = 14;
  prevSlide;
  currentSlide = 2;
  
  constructor() {
    this.render();
  }

  get template() {
    return `
      <div class="slider-controls-container row">
        <div class="slider-controls-counter-container row">
          <div class="slider-controls__current" data-element="current">${this.currentSlide}</div>
          <div>|</div>
          <div class="slider-controls__total" data-element="total">${this.maxAmount}</div>
        </div>
        <div class="slider-controls-box-container" data-element="boxContainer"></div>
        <div class="slider-controls-arrow-container row">
          <button class="slider-controls__arrow-left" data-element="arrowLeft"></button>
          <button class="slider-controls__arrow-right" data-element="arrowRight"></button>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.setBack();
    this.renderBoxes();
    this.initEventsListeners();
  }

  initEventsListeners() {
    const { arrowLeft, arrowRight, boxContainer } = this.subElements;
    
    boxContainer.addEventListener('pointerdown', (event) => this.changeSlideByBox(event));
    arrowLeft.addEventListener('pointerdown', () => this.left());
    arrowRight.addEventListener('pointerdown', () => this.right());
    
    document.addEventListener('keyup', (event) => {
      if(event.code === 'ArrowRight') this.right();
      if(event.code === 'ArrowLeft') this.left();
    })
  }

  getSubElements(element) {
    const subElementsNodeList = element.querySelectorAll('[data-element]');
    return [...subElementsNodeList].reduce((obj, subElement) => {
      obj[subElement.dataset.element] = subElement;
      return obj;
    }, {});
  }

  setBack() {
    const img = new Image();
    img.src = `assets/background/${this.currentSlide}.jpg`;
    img.addEventListener('load', () => {
      document.body.style.backgroundImage = `url(${img.src})`;
    })
  }

  renderBoxes() {
    const { boxContainer } = this.subElements;
    const boxesArr = [];
    for(let i = this.minAmount; i <= this.maxAmount; i++) {
      const setStyleCurrentBox = (i === this.currentSlide) ? 'slider-controls__box_chosen' : '';
      boxesArr.push(`<button class="slider-controls__box ${setStyleCurrentBox}" value=${i}></button>`)
    }
    boxContainer.innerHTML = boxesArr.join('');
  }

  left() {
    if(this.currentSlide === this.minAmount) {
      this.prevSlide = this.currentSlide;
      this.currentSlide = this.maxAmount;
    } else {
      this.prevSlide = this.currentSlide;
      this.currentSlide -= 1;
    }
    
    const { current, boxContainer } = this.subElements;
    current.textContent = this.currentSlide;
    boxContainer.querySelector(`[value = "${this.prevSlide}"]`).className = "slider-controls__box";
    boxContainer.querySelector(`[value = "${this.currentSlide}"]`).classList.add("slider-controls__box_chosen");

    this.setBack();
  }

  right() {
    if(this.currentSlide === this.maxAmount) {
      this.prevSlide = this.currentSlide;
      this.currentSlide = this.minAmount;
    } else {
      this.prevSlide = this.currentSlide;
      this.currentSlide += 1;
    }

    const { current, boxContainer } = this.subElements;
    current.textContent = this.currentSlide;
    boxContainer.querySelector(`[value = "${this.prevSlide}"]`).className = "slider-controls__box";
    boxContainer.querySelector(`[value = "${this.currentSlide}"]`).classList.add("slider-controls__box_chosen");

    this.setBack();
  }

  changeSlideByBox(event) {
    let target = event.target;
    let button = target.closest('button');
    if(!button) return;

    this.prevSlide = this.currentSlide;
    this.currentSlide = Number(target.value);

    const { current, boxContainer } = this.subElements;
    current.textContent = this.currentSlide;
    boxContainer.querySelector(`[value = "${this.prevSlide}"]`).className = "slider-controls__box";
    boxContainer.querySelector(`[value = "${this.currentSlide}"]`).classList.add("slider-controls__box_chosen");
    
    this.setBack()
  }
}