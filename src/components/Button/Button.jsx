import css from './button.module.css';
import PropTypes from 'prop-types';

export const ButtonLoadMore = ({ onLoad }) => {
  return (
    <button onClick={() => onLoad()} className={css.Button}>
      Load more
    </button>
  );
};

ButtonLoadMore.propTypes = {
  onLoad: PropTypes.func.isRequired,
};
