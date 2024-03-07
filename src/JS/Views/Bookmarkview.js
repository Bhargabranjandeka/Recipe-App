import Views from "./Views";

class Bookmarkview extends Views {

  _parentEl = document.querySelector('.bookmark_list')
  _previewwindow = document.querySelector('.bookmark')
  _btnpreview = document.querySelector('.btn-bookmark')
  _initialmessage = document.querySelector('.initial-message')
  _errormessage = "Please bookmark recipes"

  constructor() {
    super();
    this._showpreview();
    this._closepreview();

  }



  _generatemarkup() {
    return this._data.map(data => this._bookmarkpreviewmarkup(data))
  }

  _addhandlerbookmark(handler) {
    window.addEventListener('load', handler)
  }

  _togglepreview() {
    this._previewwindow.classList.toggle('hidden');
  }

  _showpreview() {

    this._btnpreview.addEventListener('mouseover', this._togglepreview.bind(this));
    this._previewwindow.addEventListener('mouseover', this._togglepreview.bind(this))
  }

  _closepreview() {
    this._btnpreview.addEventListener('mouseout', this._togglepreview.bind(this));
    this._previewwindow.addEventListener('mouseout', this._togglepreview.bind(this))
  }




  _bookmarkpreviewmarkup(result) {
    return `
    <li class="preview">
    <a class="preview__link" href="#${result.id}">
     
     <figure class="preview__fig">
       <img class="bookmark_fig" src="${result.image}" alt="${result.title}" />
     </figure>
     <div class="preview__data">
         <h4 class="preview_title">${result.title}</h4>
         <p class="preview_publisher">${result.publisher}</p>
      </div>
     </a>
    </li>
    `
  }

}

export default new Bookmarkview();