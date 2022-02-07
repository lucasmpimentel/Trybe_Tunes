import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardAlbum from './CardAlbum';
import '../styles/Results.css';

export default class Results extends Component {
  render() {
    const { artist, result } = this.props;
    return (
      <section className="results-container">
        <p>{`Resultado de álbuns de: ${artist}`}</p>
        { !result.length ? <p>Nenhum álbum foi encontrado</p> : (
          <div className="result-cards-Container">
            {result.map((album) => (<CardAlbum
              className="card-album"
              key={ album.collectionId }
              album={ album }
            />))}
          </div>)}
      </section>
    );
  }
}

Results.propTypes = {
  artist: PropTypes.string.isRequired,
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
};
