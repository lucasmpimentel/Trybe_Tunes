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
        <h3>Bem-Vindo</h3>
        <h2 data-testid="header-user-name">{ userName }</h2>
        <nav>
          <button type="button">
            <Link data-testid="link-to-search" to="/search">Buscar</Link>
          </button>
          <button type="button">
            <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          </button>
          <button type="button">
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </button>
        </nav>
      </header>
    );
  }
}
