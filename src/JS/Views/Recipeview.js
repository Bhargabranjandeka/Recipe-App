import Views from "./Views";
import { Fraction } from "fractional";

class Recipeview extends Views {
  _parentEl = document.querySelector('.main')
  _errormessage = 'No recipe is found'

  _addhandler(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    })
  }

  _addhandlerupdateservings(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.updateserving-btn')
      if (!btn) return

      const update_to = Number(btn.dataset.updateto)

      if (update_to > 0) handler(update_to)
    })
  }

  _addhandlerbookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.recipe-btn');
      if (!btn) return
      handler();
    })
  }

  _addhandlergoback(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.go_back')
      if (!btn) return
      handler();
    })
  }



  _generatemarkup() {
    return `
    <div class="recipe-view-box container grid--2-cols">
    
    <div class="recipe-fig-box">
      <button class="go_back"><span class="nav_goback_text">Back</span></button>
      <figure>
        <img class="recipe-fig" src="${this._data.image}"
          alt="${this._data.title} image">
      </figure>

    </div>

    <div class="recipe-details-time">
      <h2 class="recipe-heading">${this._data.title}</h2>
      <div class="recipe-info">
        <div class="recipe-short-info">
          <i class="recipe-icon bi bi-stopwatch-fill"></i>
          <span class="recipe-info-time">${this._data.cookingTime}</span>
          <span class="recipe-info-time">mins</span>
        </div>

        <div class="recipe-short-info">
          <button class="recipe-btn">
            <i class=" recipe-icon bi bi-bookmark${this._data.bookmark ? '-fill' : ''}"></i>
          </button>
        </div>

      </div>

      <div class="recipe-servings">
        <i class="recipe-icon bi bi-people-fill"></i>

        <span class="recipe-info-time">${this._data.servings} servings</span>

        <button class="updateserving-btn" data-updateto="${this._data.servings + 1}">
          <i class="recipe-icon bi bi-plus-circle"></i>
        </button>

        <button class="updateserving-btn" data-updateto="${this._data.servings - 1}">
          <i class="recipe-icon bi bi-dash-circle"></i>
        </button>

        <div></div>
      </div>

      <div class="recipe-ingredients-details">
        <span class="recipe-ingredient-heading">Ingredients</span>
        <ul class="ingredients-details">
          ${this._data.ingredients.map(ing => this._ingredients(ing)).join('')}
        </ul>
      </div>

      <div class="how-to-cook">
        <h2 class="direction-heading">How to cook</h2>
        <div class="direction-box">
          <p class="direction-description">This recipe was carefully designed and tested by <strong>${this._data.publisher}</strong>. Please
            check
            out directions
            at their
            website.
          </p>
          <a href="${this._data.sourceUrl}" class="direction">
            <span class="span-ele">Direction</span>
            <i class="direction-icon bi bi-arrow-right"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
    
    
    
    `
  }

  _ingredients(ing) {
    return `
    <li class="recipe-ingredient">
      <i class="ingredient-check bi bi-check2"></i>
      <div class="ingredient-quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
      <div class="ingredient-description"> <span>${ing.unit}</span> ${ing.description}</div>
    </li>
    
    
    `

  }

}

export default new Recipeview();