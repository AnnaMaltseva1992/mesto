export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this.renderer = renderer;
  }

  addItem(item) {
      this._container.prepend(item);
    }

  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item);
    });
  } 
}