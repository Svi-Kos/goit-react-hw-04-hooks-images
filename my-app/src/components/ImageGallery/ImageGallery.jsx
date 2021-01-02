import React, { Component } from 'react';
import imageAPI from '../../services/apiSevice';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const selfSearchQuery = this.props.searchQuery;
    const selfStatePage = this.state.page;
    const errorMessage = 'Please enter more specific query';

    const loadImagesByQuery = (selfSearchQuery, selfStatePage) => {
      imageAPI
        .fetchImages(selfSearchQuery, selfStatePage)
        .then(newImages => {
          this.setState({
            images: [...prevState.images, ...newImages.hits],
            status: 'resolved',
          });
          if (newImages.length === 0) {
            alert(errorMessage);
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    };

    if (selfStatePage > 1 && this.state.images !== prevProps.images) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevProps.searchQuery !== selfSearchQuery) {
      prevState.images = [];
      this.setState({ images: [], status: 'pending', page: 1 });

      loadImagesByQuery(selfSearchQuery, selfStatePage);
    }

    if (prevState.page !== selfStatePage) {
      // this.setState({ status: 'pending' });

      loadImagesByQuery(selfSearchQuery, selfStatePage);
    }
  }

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      status: 'resolved',
    }));
  };

  render() {
    const { images, error, status } = this.state;
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
            <Button onLoadMore={this.onLoadMore} />
          </>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
