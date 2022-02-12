import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';
import '../icons/favorito.png';
import {
  addSong,
  getFavoriteSongs /* removeSong */ } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isChecked: false,
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.validateFav();
    this.setState({ loading: false });
  }

  validateFav = async () => {
    this.setState({ loading: true });
    const { music: { trackId } } = this.props;
    const getFavorites = await getFavoriteSongs();
    const checkFav = getFavorites.some((favorite) => favorite.trackId === trackId);
    this.setState({ loading: false });
    this.setState({ isChecked: checkFav });
  }

  handleChange = async () => {
    // const { isChecked } = this.state;
    const { music } = this.props;
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false, isChecked: true });
  }

  render() {
    const { isChecked, loading } = this.state;
    const { music } = this.props;
    const {
      artworkUrl100,
      collectionName,
      currency,
      previewUrl,
      trackName,
      trackPrice,
      trackId } = music;

    return (
      <div className="music-card-container">
        <img src={ artworkUrl100 } alt="trackName" />
        <div className="music-card-title">
          <div className="title-and-fav">
            <h1>{ trackName }</h1>
            { loading ? <p>Carregando...</p> : (
              <label htmlFor="favorite">
                <span hidden>Favorita</span>
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  id="favorite"
                  onChange={ this.handleChange }
                  checked={ isChecked }
                />
              </label>
            )}
          </div>
          <hr />
          <div className="track-info-container">
            <span>{ collectionName }</span>
            <span>{`${trackPrice} ${currency}`}</span>
          </div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
};
