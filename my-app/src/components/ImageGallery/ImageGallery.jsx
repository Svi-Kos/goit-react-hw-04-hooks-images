import { useState, useEffect } from 'react';
import imageAPI from '../../services/apiSevice';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    if (page === 1) {
      setStatus('pending');
    }

    const errorMessage = 'Please enter more specific query';

    imageAPI
      .fetchImages(searchQuery, page)
      .then(newImages => {
        setImages(images => [...images, ...newImages]);
        setStatus('resolved');

        if (page > 1) {
          const elemToScroll = document.documentElement.scrollHeight - 1232;
          window.scrollTo({
            top: elemToScroll,
            behavior: 'smooth',
          });
        }

        if (newImages.length === 0) {
          alert(errorMessage);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });

    page === 1 && setImages([]);
  }, [searchQuery, page]);

  const onLoadMore = () => {
    setPage(page + 1);
    setStatus('resolved');
  };

  return (
    <>
      {status === 'pending' && (
        <Loader
          type="ThreeDots"
          color="#303f9f"
          height={80}
          width={80}
          style={{ textAlign: 'center' }}
        />
      )}{' '}
      {status === 'rejected' && <p>{error.message}</p>}{' '}
      {status === 'resolved' && (
        <>
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          {images.length > 0 && <Button onLoadMore={onLoadMore} />}
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
