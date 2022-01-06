import PropTypes from "prop-types";
import { Component } from "react";
import s from './SearchBar.module.css';

export default class SearchBar extends Component{

  state = {
    name: '',
 }
  inputValueHandler = (e) => {
    
    this.setState({name:e.currentTarget.value.toLowerCase()})
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.name.trim() === '') {
      return alert('enter something...');
    }
    this.props.name(this.state.name)
    this.setState({name:''})
  }
  render() {
    
    return (
      <div className={s.mainContainer}>
        <header className={s.Searchbar}>
          <form
            className={s.SearchForm}
            onSubmit={this.onSubmit}
          >
            <button
              type="submit"
              className={s.SearchFormButton}
              
            >
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>
  
            <input
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.inputValueHandler}
            />
          </form>
          
        </header>
       
      </div>
    );
  };
  
}
PropTypes.SearchBar = {

}