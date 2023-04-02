import { ButtonLoadMore } from 'components/Button/Button';
import { ImgageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';
import css from './image-gallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: 'null',
    error: 'null',
    status: 'idle',
    page: 1,
  };
  componentDidUpdate(PrevProps, PrevState) {
    const prevValue = PrevProps.value;
    const nextValue = this.props.value;

    if (prevValue !== nextValue) {
      console.log('Изменился запрос');

      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextValue}&page=${this.state.page}&key=34683209-8b2cd5e146e244d990d25d370&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(
              new Error(`Нет результатов по запросу ${nextValue}`)
            );
          })
          .then(images => {
            this.setState({ images, status: 'resolved' });
            this.onLoad();
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1500);
    }
  }

  onLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <div className={css.ImageGallery}>
            {images.hits.map(hit => {
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
          {images.hits.length !== 0 && <ButtonLoadMore onLoad={this.onLoad} />}
        </>
      );
    }
  }
}
