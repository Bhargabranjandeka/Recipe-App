import Views from "./Views";

class Resultview extends Views {
  _parentEl = document.querySelector('.main');
  _errormessage = 'No result is found'

  _generatemarkup() {
    return `
    
    <div class="search-result-container container grid">
       ${this._data.map(data => this._generatepreview(data)).join('')}
     </div>
    
    `
  }

  _generatepreview(result) {
    return `
    <div class="search-results" role="button" aria-label="search-results">
      <ul class="results">
         <li class="div-list-item">
           <a class="preview-link" href="#${result.id}">
              <figure class="div-fig-box">
               <img
                  src="${result.image}"
                  alt="pizza image" class="preview-fig">
              </figure>
              <div class="preview-data">
                 <h4 class="preview-title">${result.title}</h4>
                 <p class="preview-publisher">${result.publisher}</p>
              </div>
           </a>
         </li>
      </ul>
    </div>
    
    
    `

  }

}

export default new Resultview();