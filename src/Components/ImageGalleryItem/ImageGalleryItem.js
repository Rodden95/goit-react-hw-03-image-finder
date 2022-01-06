import s from './ImageGalleryItem.module.css'
import PropTypes from "prop-types";

export default function ImageGalleryItem({image, modal}) {

  const { webformatURL, tags, id, largeImageURL} = image
  // console.log(largeImageURL);
  return (
  
    <li
      className={s.ImageGalleryItem}
      
      key={id}
      
      onClick={modal}
    >
          <img src={webformatURL} name={id} alt={tags} className={s.ImageGalleryItemImage} />
        </li>
  
    
  );
}
PropTypes.ImageGalleryItem = {
  image: PropTypes.array.isRequired,
  modal: PropTypes.func.isRequired,
}