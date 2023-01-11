import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.handlevalid);
  };

  handlevalid = () => {
    const { name, email } = this.state;
    const MIN = 3;
    const nameValid = name.length >= MIN;
    const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const emailValid = regexMail.test(email);

    this.setState({ isDisable: !(nameValid && emailValid) });
  };

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            name="email"
            id="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisable }
        >
          Play

        </button>
      </form>
    );
  }
}

export default connect()(Login);
