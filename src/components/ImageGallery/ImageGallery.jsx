import { ButtonLoadMore } from 'components/Button/Button';
import { ImgageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';
import css from './image-gallery.module.css';
import imagesAPI from '../sources/pixabay';
import PropTypes, { shape } from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: 'null',
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(PrevProps, PrevState) {
    const prevValue = PrevProps.value;
    const nextValue = this.props.value;

    if (prevValue !== nextValue) {
      console.log('Изменился запрос');

      this.setState({ status: 'pending', page: 1 });

      setTimeout(() => {
        imagesAPI
          .fetchImages(nextValue, this.state.page)
          .then(pictures => {
            console.log(pictures.hits);
            this.setState(prevState => ({
              images: [...pictures.hits],
              status: 'resolved',
            }));
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1500);
    }
  }

  imagesClear = () => {
    this.setState({ images: [] });
  };

  onLoad = () => {
    console.log(this.state.page);

    imagesAPI
      .fetchImages(this.props.value, this.state.page + 1)
      .then(pictures => {
        this.setState(prevState => ({
          page: prevState.page + 1,
          images: [...prevState.images, ...pictures.hits],
        }));
      });
    console.log(this.props.value);
    console.log(this.state.page);
    console.log(this.state.images);
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <Loader clearImages={this.imagesClear} />;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <div className={css.ImageGallery}>
            {images.map(hit => {
              return (
                <ImgageGalleryItem
                  key={hit.id}
                  smallImage={hit.webformatURL}
                  largeImage={hit.largeImageURL}
                  tags={hit.tags}
                />
              );
            })}
          </div>
          {images.length !== 0 && <ButtonLoadMore onLoad={this.onLoad} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ),
};
