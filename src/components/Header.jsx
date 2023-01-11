import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    hash: '',
    score: 0,
  };

  componentDidMount() {
    const { email } = this.props;
    const gravatarHash = MD5(email).toString();
    this.setState({
      hash: gravatarHash,
    });
  }

  render() {
    const { name } = this.props;
    const { hash, score } = this.state;
    return (
      <header>
        <h2 data-testid="header-player-name">{ name }</h2>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-score"
        >
          Score:
          { score }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  history: P.shape({
    push: P.func,
  }),
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
