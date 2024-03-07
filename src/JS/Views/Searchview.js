class Searchview {
  _parentEl = document.querySelector('.header-form')

  getquery() {
    const query = this._parentEl.querySelector('.input-field').value;
    this._parentEl.querySelector('.input-field').value = '';
    return query

  }

  addhandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler()
    })
  }
};

export default new Searchview();