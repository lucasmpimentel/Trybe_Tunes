import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';

export default class MusicCard extends Component {
  render() {
    const { music: {
      artworkUrl100,
      collectionName,
      currency,
      previewUrl,
      trackName,
      trackPrice } } = this.props;
    return (
      <div className="music-card-container">
        <img src={ artworkUrl100 } alt="trackName" />
        <div className="music-card-title">
          <h1>{ trackName }</h1>
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
