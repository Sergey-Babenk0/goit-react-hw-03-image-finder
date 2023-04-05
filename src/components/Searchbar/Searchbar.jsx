import css from './search-bar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleValueChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      alert('Нечего искать;)');
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.label}>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.SearchFormInput}
            onChange={this.handleValueChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
