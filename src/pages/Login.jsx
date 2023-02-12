import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenTrivia } from '../services/apiTrivia';
import { getGravatarEmail, getName } from '../redux/action';
import '../syles/Login.css';
import Logo from '../imgs/trivia-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';

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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    const token = await fetchTokenTrivia();
    dispatch(getGravatarEmail(email));
    dispatch(getName(name));
    localStorage.setItem('token', token.token);
    history.push('/game');
  };

  onclickSetting = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <>
        <img src={ Logo } alt="" />

        <div className="formContent">
          <Form onSubmit={ this.handleSubmit }>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="name">
                <Form.Control
                  placeholder="Nome"
                  type="text"
                  name="name"
                  id="name"
                  data-testid="input-player-name"
                  value={ name }
                  onChange={ this.handleChange }
                  required
                  className="mb-3"
                  controlId="formBasicEmail"
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="email">

                <Form.Control
                  placeholder="E-mail"
                  type="text"
                  name="email"
                  id="email"
                  data-testid="input-gravatar-email"
                  value={ email }
                  onChange={ this.handleChange }
                  required
                />
              </Form.Label>
            </Form.Group>
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ isDisable }
            >
              Play

            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.onclickSetting }
            >
              Settings
            </button>
          </Form>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
