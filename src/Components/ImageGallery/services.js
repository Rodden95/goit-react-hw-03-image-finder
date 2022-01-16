class Services {

  constructor(page, nextName, id) {
    this.id = id;
    this.nextName = nextName;
    this.page = page;
    this.apiKey = '24225279-9c926e63021bd911a81e6f13c';
  }

  fetch() {
    return fetch(`https://pixabay.com/api/?key=${this.apiKey}&q=${this.nextName}&per_page=12&page=${this.page}`);
  }
  fetchPic() {
    return fetch(`https://pixabay.com/api/?key=${this.apiKey}&id=${this.id}`)
  };



}

export default Services;