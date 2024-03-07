import { async } from "regenerator-runtime";
import { getJson } from "./helper";
import { API_URL } from "./config";
import { sendJson } from "./helper";

const API_key = "4bb475a8-d8aa-4e3f-8252-dcc90c685589";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1
  },
  book_mark: []
}


const create_recipe_object = function (data) {
  const { recipe } = data.data
  return state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { API_Key: recipe.key }) /// conditionally adding property to object //
  }
}

export const loadrecipe = async function (id) {

  try {
    const data = await getJson(`${API_URL}${id}?key=${API_key}`);
    state.recipe = create_recipe_object(data);

    if (state.book_mark.some(bk => bk.id === id)) state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
  }

  catch (err) {
    throw err
  }


}

export const loadsearch = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}&key=${API_key}`)

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { API_key: rec.key })
      }
    })
    console.log(state.search.results)
    state.search.page = 1;

  }
  catch (err) {

    throw err
  }
}

export const updateservings = function (newservings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newservings) / state.recipe.servings
  })
  state.recipe.servings = newservings

}

export const uploadrecipe = async function (newrecipe) {
  try {
    const ingredients = Object.entries(newrecipe).filter(ent => ent[0].startsWith('ingredient') && ent[1] !== '').map(ing => {
      const ing_arr = ing[1].replaceAll(' ', '').split(',')
      if (ing_arr.length !== 3) throw new Error('invalid format, please check the format type');
      const [quantity, unit, description] = ing_arr;
      return { quantity: quantity ? Number(quantity) : null, unit, description }
    })

    const recipe = {
      title: newrecipe.title,
      source_url: newrecipe.sourceUrl,
      image_url: newrecipe.image,
      publisher: newrecipe.publisher,
      cooking_time: +newrecipe.cookingTime,
      servings: +newrecipe.servings,
      ingredients
    }

    console.log(recipe)

    const data = await sendJson(`${API_URL}?key=${API_key}`, recipe)
    state.recipe = create_recipe_object(data);
  }
  catch (err) {
    console.error(err)
  }
}

export const persistentstorage = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.book_mark))
}

export const addbookmark = function (recipe) {
  state.book_mark.push(recipe)
  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;
  persistentstorage();
}

export const deletebookmark = function (id) {
  const index = state.book_mark.findIndex(bk => bk.id === id);
  state.book_mark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmark = false;
  persistentstorage();
}

const clearbookmarks = function () {
  localStorage.clear()
}

//clearbookmarks()

const loadingbookmark = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.book_mark = JSON.parse(storage)
};

loadingbookmark()