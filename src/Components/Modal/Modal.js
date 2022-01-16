import s from './Modal.module.css'
import PropTypes from "prop-types";
export default function Modal({ photo, modal }) {
  return (
    <div className={s.Overlay}
      onClick={modal}
      data="asd">
      <div className={s.Modal}>
        {
          photo.map(({ largeImageURL, id, tags }) =>
            <img 
              src={largeImageURL} 
              alt={tags} 
              key={id} 
              className={s.photo} 
            />)
          
        }
      </div>
    </div>
  )
}
PropTypes.Modal = {
  photo: PropTypes.array.isRequired,
  modal: PropTypes.func.isRequired,
}