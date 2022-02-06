import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state={
    search: '',
    isSearchDisabled: true,
  }

  checkSearch = () => {
    const { search } = this.state;
    const MIN_CHAR = 2;
    if (search.length >= MIN_CHAR) {
      this.setState({ isSearchDisabled: false });
    } else {
      this.setState({ isSearchDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.checkSearch);
  }

  handleClick = (event) => {
    console.log(`Pesquisar ${event}`);
  }

  render() {
    const { isSearchDisabled, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            data-testid="search-artist-input"
            name="search"
            onChange={ this.handleChange }
            type="text"
            value={ search }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isSearchDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </section>
      </div>
    );
  }
}
