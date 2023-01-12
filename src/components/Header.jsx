import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const gravatarHash = MD5(email).toString();
    this.setState({
      hash: gravatarHash,
    });
  }

  render() {
    const { name, score } = this.props;
    const { hash } = this.state;
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
          {' '}
          { score }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
