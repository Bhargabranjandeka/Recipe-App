class Mobilenavigation {
  _btnmobile = document.querySelector('.btn-mobile-nav')

  constructor() {
    this._openmobilenav();
  }

  _openmobilenav() {
    this._btnmobile.addEventListener('click', function () {
      document.querySelector('.header-container').classList.toggle('nav-open')
    })
  }

  _closenav() {
    document.querySelector('.header-container').classList.remove('nav-open')
  }
}

export default new Mobilenavigation();