import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../styles/Album.css';

export default class Album extends Component {
  state={
    musics: [],
    artistName: '',
    albumName: '',
    albumImage: '',
    albumPrice: '',
    currency: '',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const recoverMusics = await getMusics(id);
    const musics = recoverMusics.filter(({ trackId }) => trackId);
    this.setState({
      artistName: recoverMusics[0].artistName,
      albumName: recoverMusics[0].collectionName,
      albumImage: recoverMusics[0].artworkUrl100,
      albumPrice: recoverMusics[0].collectionPrice,
      currency: recoverMusics[0].currency,
      musics,
    });
  }

  render() {
    const {
      artistName, albumName,
      albumImage, albumPrice,
      currency, musics } = this.state;
    return (
      <section data-testid="page-album">
        <Header />
        <section className="container-album-content">
          <aside className="container-album-info">
            <h1 data-testid="artist-name">{ artistName }</h1>
            <img src={ albumImage } alt={ albumName } />
            <p data-testid="album-name">{ albumName }</p>
            <p>{` Valor: ${albumPrice} ${currency}`}</p>
          </aside>
          <section>
            { musics.map((music) => (<MusicCard
              key={ music.trackId }
              music={ music }
            />))}
          </section>
        </section>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};
