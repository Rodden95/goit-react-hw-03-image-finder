import { Component } from "react";
import ImageGallery from './Components/ImageGallery'
import SearchBar from './Components/SearchBar';

import './App.css'
class App extends Component {
  
  state = {
    name: '',
    photo: null,
  }

 
  nameFromSearchBar = name => {
    this.setState({ name });
    
  }
  
  render() {
    const { name } = this.state;
    return (
      
      <div>
        <SearchBar name={this.nameFromSearchBar} />
        <ImageGallery name={name} />
        
      </div>
    )
  };
}

export default App;
