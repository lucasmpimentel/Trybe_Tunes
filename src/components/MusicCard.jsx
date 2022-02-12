import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';
import '../icons/favorito.png';
import {
  addSong,
  getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isChecked: false,
  }

  async componentDidMount() {
    this.validateFav();
  }

  validateFav = async () => {
    const { loadingChange } = this.props;
    const { music: { trackId } } = this.props;
    loadingChange(true);
    const getFavorites = await getFavoriteSongs();
    const checkFav = getFavorites.some((favorite) => favorite.trackId === trackId);
    this.setState({ isChecked: checkFav });
    loadingChange(false);
  }

  handleChange = async () => {
    const { isChecked } = this.state;
    const { music, loadingChange } = this.props;
    loadingChange(true);
    if (!isChecked) {
      await addSong(music);
      this.setState({ isChecked: true }, () => loadingChange(false));
    } else {
      removeSong(music);
      this.validateFav();
    }
  }

  render() {
    const { isChecked } = this.state;
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
  loadingChange: PropTypes.func.isRequired,
};
