import { Component } from 'react';
import css from './image-gallery-item.module.css';
// import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImgageGalleryItem extends Component {
  state = {
    isModalOpen: 'false',
  };

  openModal = () => {
    this.setState({
      isModalOpen: 'true',
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: 'false',
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { smallImage, largeImage, tags } = this.props;
    return (
      <div className={css.ImgageGalleryItem}>
        <img
          src={smallImage}
          alt={tags}
          onClick={this.openModal}
          className={css.ImageGalleryItemImage}
        />
        {isModalOpen === 'true' && (
          <Modal image={largeImage} tags={tags} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
