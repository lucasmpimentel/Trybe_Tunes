import React, { Component } from 'react';
import Header from '../components/Header';
import Results from '../components/Results';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state={
    search: '',
    isSearchDisabled: true,
    loading: false,
    result: [],
    showAllResults: false,
    artist: '',
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

  handleClick = async () => {
    const { search } = this.state;
    const partialResults = await searchAlbumsAPI(search);
    this.setState(({ loading: true }));
    return this.setState({
      loading: false,
      showAllResults: true,
      result: partialResults,
      artist: search,
    }, () => this.setState({ search: '' }));
  }

  render() {
    const {
      isSearchDisabled,
      search,
      loading,
      artist,
      result,
      showAllResults } = this.state;
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
        <section>
          { loading && <p>Carregando...</p> }
          { showAllResults && <Results artist={ artist } result={ result } /> }

        </section>
      </div>
    );
  }
}
