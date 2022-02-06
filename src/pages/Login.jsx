import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state={
    name: '',
    isSaveButtonDisabled: true,
    loading: false,
    redirecting: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.checkSaveButton);
  }

  checkSaveButton = () => {
    const { name } = this.state;
    const MIN_CHAR = 3;
    if (name.length >= MIN_CHAR) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      this.setState({ loading: false, redirecting: true });
    });
  }

  render() {
    const { name, isSaveButtonDisabled, loading, redirecting } = this.state;
    if (loading) return <span>Carregando...</span>;
    if (redirecting) return <Redirect to="/search" />;
    return (
      <section data-testid="page-login">
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="login">
            Login
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ isSaveButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}
