import PropTypes from "prop-types";
import { Component } from "react";
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem'
import Loader from "react-loader-spinner";
import Button from '../Button';
import Modal from '../Modal';
import Init from "../../services";

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
    // const services = new Services(page, nextName, id);
    const services = Init(page, nextName, id);

    if (prevProps.name !== nextName) {
      this.setState({ loader: true })
      services.fetch()
      .then(({ hits }) =>
        this.setState({ pictures: hits }))
      .finally(() =>
        this.setState({ loader: false }))
        
    } else if (prevState.page !== page) {
      services.fetch()
        .then(({ hits }) =>
          this.setState(prevState =>
            ({ pictures: [...prevState.pictures, ...hits] })))
        .finally(() =>
          this.setState({ loader: false }))
      
    } else if (prevState.id !== id) {
      this.setState({photo: null})
      services.fetchPic()
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