import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearPlayerInfos } from '../redux/action';

class Feedback extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => dispatch(clearPlayerInfos()) }
          >
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Feedback);
