import PropTypes from "prop-types";
import { Component } from "react";
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem'
// import Loader from '../Loader';
import Loader from "react-loader-spinner";
import Button from '../Button';
import Modal from '../Modal';
export default class ImageGallery extends Component {
  
  state = {
    pictures: null,
    page: 1,
    loader: false,
    modalOpen: false,
    id: null,
    photo:null
  }

  componentDidUpdate(prevProps, prevState) {
    const nextName = this.props.name;
    const { page,id } = this.state;
    const apiKey = '24225279-9c926e63021bd911a81e6f13c';
    
    if (prevProps.name !== nextName) {
      this.setState({ loader: true })
      return fetch(`https://pixabay.com/api/?key=${apiKey}&q=${nextName}&per_page=12&page=${page}`)
        .then(res =>
          res.json())
        .then(({ hits }) =>
          this.setState({ pictures: hits }))
        .finally(() =>
          this.setState({ loader: false }))
        
    } else if (prevState.page !== page) {

      return fetch(`https://pixabay.com/api/?key=${apiKey}&q=${nextName}&per_page=12&page=${page}`)
        .then(res =>
          res.json())
        .then(({ hits }) =>
          this.setState(prevState =>
            ({ pictures: [...prevState.pictures, ...hits] })))
        .finally(() =>
          this.setState({ loader: false }))
    } else if (prevState.id !== id) {
      this.setState({photo: null})
      return fetch(`https://pixabay.com/api/?key=${apiKey}&id=${id}`)
        .then(res =>
          res.json())
        .then(({hits}) =>
         this.setState({photo: hits}))
        
    }
  }
  componentDidMount() {
      window.addEventListener('keydown', this.modalClose)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalClose)
  }
  modalOpener = (e) => {

    const id = e.target.name;
    this.setState(
      ({
        // loader: true,
        modalOpen: true,
        id
      })
    )
  }
  modalClose = (e) => {
    if (e.target === e.currentTarget || this.state.modalOpen && e.code === 'Escape') {
      this.setState({ modalOpen: false })
    };
   
}
  
  nextPage = () =>
    this.setState(prevState =>
    ({
      page: prevState.page + 1,
      loader:true
    }));
  
  
  render() {
    const { modalOpen, photo, pictures,loader } = this.state;
    return (
      <div className={s.center}>
        <ul className={s.ImageGallery}>
          {!this.props.name && <div className={s.text}>...Найдется все</div>}
          {loader && <div className={s.loader}>
            <Loader type="Bars"
              color="#00BFFF"
              height={200}
              width={200}
              timeout={2000}
            />
          </div>}
          
          {pictures &&
            (pictures.map(image =>
              <ImageGalleryItem image={image} key={image.id} modal={this.modalOpener} />
            ))}
          {modalOpen && photo && <Modal photo={photo} modal={this.modalClose} />}
        </ul>
        {pictures && <Button onClick={this.nextPage} />}
      </div>
    )
  }
}
PropTypes.ImageGallery = {
  name: PropTypes.string.isRequired,
}