export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._container = document.querySelector(containerSelector);
      this.renderer = renderer;
    }

    addItem(element) {
        this._container.prepend(element);
      }

      renderItems() {
        this._items.forEach((item) => {
            this.renderer(item);
      });
    } 
}