export default class Views {
  _data;
  _query;

  render(data) {
    if (!data || (Array.isArray(data)) && data.length === 0) return this._rendermainerrormessage()
    this._data = data
    const markuphtml = this._generatemarkup()
    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', markuphtml)
  }


  _clear() {
    this._parentEl.innerHTML = '';
  }

  _rendererrormessage(message = this._errormessage) {
    const markup = `
    <div>
      <p class="initial-message">${message}</p>
    </div>`

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup)
  }

  _rendermainerrormessage(message = this._errormessage) {
    const markup = `
    <div class="error">
      <p class="errormessage">${message}</p>
    </div>`

    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', markup)
  }

  _renderspinner() {
    const markup = `
    <div class="rotator">
    
      <i class="rotate bi bi-arrow-repeat"></i>
    
    </div>`


    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin', markup)
  }
}