import Search from './models/Search';

/** Global state of the app
 * - Search Object (contains both seach query and results)
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
  // get query from view
  const query = 'pizza' // TODO:

  if (query) {
    // new search object and add to state
    state.search = new Search(query);

    // prepare for ui results

    // search for recipes
    await state.search.getResults();

    // render results from the ui
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
