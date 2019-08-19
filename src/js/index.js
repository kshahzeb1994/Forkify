import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

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

    // search for recipes
    await state.search.getResults();

    // render results from the ui
    searchView.renderResults(state.search.result);

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
