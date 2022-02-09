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
        className="noDecoration"
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div className="album-container">
          <h3 className="noDecoration">{ collectionName }</h3>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p className="noDecoration">{ artistName }</p>
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
