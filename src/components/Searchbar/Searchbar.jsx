import css from './search-bar.module.css';
import { Component } from 'react';
// import { toast } from 'react-toastify';

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
            class="input"
            type="text"
            autocomplete="off"
            autofocus
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
