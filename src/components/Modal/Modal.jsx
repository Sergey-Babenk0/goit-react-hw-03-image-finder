import { Component } from 'react';
import css from './modale.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onModalCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalCloseByEsc);
  }

  onModalCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseModalByBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;
    return (
      <div
        className={css.Overlay}
        onClick={this.onCloseModalByBackdrop}
        onCloseByEsc={this.onCloseModalByEsc}
      >
        <div className={css.Modal}>
          <img src={image} alt={tags} />;
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
