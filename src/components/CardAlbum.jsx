import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/CardAlbum.css';

export default class CardAlbum extends Component {
  render() {
    const { album: {
      collectionName,
      artistName,
      artworkUrl100,
      collectionId } } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div className="album-container">
          <h3>{ collectionName }</h3>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p>{ artistName }</p>
        </div>
      </Link>
    );
  }
}

CardAlbum.propTypes = {
  album: PropTypes.objectOf(oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
