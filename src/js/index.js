import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
 * - Search Object (contains both seach query and results)
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
  // get query from view
  const query = searchView.getInput(); // TODO:

  if (query) {
    // new search object and add to state
    state.search = new Search(query);

    // prepare for UI results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // search for recipes and parse ingredients
      await state.search.getResults();
      state.recipe.parseIngredients();

      // render results from the ui
      clearLoader();
      searchView.renderResults(state.search.result);
    }
    catch (error) {
      alert("Something went wrong with the search");
      clearLoader();
    }

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


elements.searchRes.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goto = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goto);
  }
});


/**
 * Recipe Controller
 */
const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace("#", "");

  if (id) {
      // prepare UI for changes

      // create new recipe Object
      state.recipe = new Recipe(id);

      try {
        // get recipe data
        await state.recipe.getRecipe();
        console.log(state.recipe.ingredients);
        // calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // render recipe
        console.log(state.recipe);
      } catch (error) {
        alert("Error Processing Recipe");
      }
  }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
