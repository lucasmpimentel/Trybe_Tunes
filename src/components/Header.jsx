import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/header.css';

export default class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  recoverUserName = async () => {
    const { name } = await getUser();
    this.setState(() => ({ userName: name, loading: false }));
  };

  render() {
    const { loading, userName } = this.state;
    if (loading) {
      this.recoverUserName();
      return <span>Carregando...</span>;
    }
    return (
      <header data-testid="header-component">
        <h1>Trybe Tunes</h1>
        <h2 data-testid="header-user-name">{ userName }</h2>
        <nav>
          <span>Menu: </span>
          <button type="button">
            <Link to="/search">Buscar</Link>
          </button>
          <button type="button">
            <Link to="/favorites">Favoritas</Link>
          </button>
          <button type="button">
            <Link to="/profile">Perfil</Link>
          </button>
        </nav>
      </header>
    );
  }
}
