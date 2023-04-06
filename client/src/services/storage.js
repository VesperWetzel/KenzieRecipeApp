class Storage {
  searchResultsKey = "search-results";

  getSearchResults() {
    return this.get(this.searchResultsKey);
  }

  setSearchResults(value) {
    this.set(this.searchResultsKey, value);
  }

  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export default new Storage()