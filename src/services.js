class Services {

  constructor(page, nextName, id) {
    this.id = id;
    this.nextName = nextName;
    this.page = page;
    this.apiKey = '24225279-9c926e63021bd911a81e6f13c';
  }

  async fetch() {
    try{
      const response = await fetch(`https://pixabay.com/api/?key=${this.apiKey}&q=${this.nextName}&per_page=12&page=${this.page}`)
    return response.json();
    }catch(error){
      throw error
    }
  }
  async fetchPic() {
    try{
      const response = await fetch(`https://pixabay.com/api/?key=${this.apiKey}&id=${this.id}`);

    return response.json();
    }catch(error){
      throw error
    }
  };



}

export default function Init (page, nextName, id){
  return new Services(page, nextName, id)
}