import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  function showLargeImage() {
    const instance = basicLightbox.create(`
        <img src="${largeImageURL}" alt="${tags}" width="800" height="600">
    `);

    instance.show();
  }

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={showLargeImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
