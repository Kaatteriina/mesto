export default class Section { 
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(selector); // Сохраняем контейнер
  }

  renderAllElements() {
    this.items.forEach(this.renderer(this.container));
  }

  addItem($element) {
    this.container.prepend($element);
  }
}
