export default class Section { 
  constructor({items, renderer}, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;
  }


  renderAllElements() {
    // renderer - замыкающая в себе селектор функция, дабы передать функцию рендера в forEach вместе с селектором который передали в инстанс класса
    this.items.forEach(this.renderer(this.selector))
  }

  addItem($element) {
    document.querySelector(this.selector).prepend($element)
  }
}