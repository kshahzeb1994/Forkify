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

    // search for recipes
    await state.search.getResults();

    // render results from the ui
    clearLoader();
    searchView.renderResults(state.search.result);

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
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
