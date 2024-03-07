import Views from "./Views";

class Addrecipeviews extends Views {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.window-add-recipe');
  _overlay = document.querySelector('.overlay')
  _btnopen = document.querySelector('.btn-add-recipe');
  _btnclose = document.querySelector('.close-btn')

  constructor() {
    super();
    this._show_window()
    this._close_window()
  }

  _togglewindow() {
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden');

  }

  _show_window() {
    this._btnopen.addEventListener('click', this._togglewindow.bind(this))
  }

  _close_window() {
    this._btnclose.addEventListener('click', this._togglewindow.bind(this))
    this._overlay.addEventListener('click', this._togglewindow.bind(this))
  }

  _addhandlerupload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const data_arr = [...new FormData(this)]
      const entriesdata = Object.fromEntries(data_arr)
      handler(entriesdata)
    })
  }

  _generateMarkup() { }
}

export default new Addrecipeviews();