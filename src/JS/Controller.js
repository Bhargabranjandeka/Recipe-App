import { async } from "regenerator-runtime";
import * as model from "./Model"
import Searchview from "./Views/Searchview";
import Resultview from "./Views/Resultview";
import Recipeview from "./Views/Recipeview";
import Addrecipeviews from "./Views/Addrecipeviews";
import Bookmarkview from "./Views/Bookmarkview";

import mobilenavigation from "./mobilenavigation";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


const control_Recipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return
    Recipeview._renderspinner()
    await model.loadrecipe(id)

    Recipeview.render(model.state.recipe)
    mobilenavigation._closenav()
    console.log(model.state.recipe)
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  catch (err) {
    console.error(err)
  }
}

const control_search_result = async function () {
  try {

    Resultview._renderspinner()
    const query = Searchview.getquery();

    if (!query) return

    await model.loadsearch(query);
    console.log(model.state.search.results)


    Resultview.render(model.state.search.results)

    mobilenavigation._closenav()

  }
  catch (err) {
    Resultview._rendermainerrormessage()
  }
}

const control_backmenu = async function () {
  try {
    Resultview._renderspinner()
    await model.loadsearch(model.state.search.query)
    Resultview.render(model.state.search.results)
  }
  catch (err) { console.error(err) }
}

const controlservings = async function (newservings) {
  model.updateservings(newservings);
  Recipeview.render(model.state.recipe)
}

const renderingbookmark = function () {

  Bookmarkview.render(model.state.book_mark)

}

const controlbookmark = function () {

  if (!model.state.recipe.bookmark) model.addbookmark(model.state.recipe)
  else model.deletebookmark(model.state.recipe.id)
  Recipeview.render(model.state.recipe)
  Bookmarkview.render(model.state.book_mark)
}




const addrecipe = async function (newrecipe) {
  await model.uploadrecipe(newrecipe);
  console.log(newrecipe)
  Recipeview.render(model.state.recipe)

  window.history.pushState('null', '', `#${model.state.recipe.id}`)

  mobilenavigation._closenav()

  setTimeout(function () {
    Addrecipeviews._togglewindow()
  }, 2000)


}

const init = function () {
  Bookmarkview._addhandlerbookmark(renderingbookmark)
  Recipeview._addhandler(control_Recipes);
  Recipeview._addhandlerbookmark(controlbookmark)
  Searchview.addhandler(control_search_result);
  Recipeview._addhandlerupdateservings(controlservings)
  Addrecipeviews._addhandlerupload(addrecipe)
  Recipeview._addhandlergoback(control_backmenu);
}

init()