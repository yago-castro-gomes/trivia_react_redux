import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import P from 'prop-types';
import Header from '../components/Header';
import { clearPlayerInfos } from '../redux/action';

class Feedback extends Component {
  render() {
    const { dispatch, assertions } = this.props;
    const THREE = 3;

    return (
      <>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
        <p data-testid="feedback-text">
          {assertions < THREE
            ? 'Could be better...'
            : 'Well Done!'}
        </p>
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
  dispatch: P.func.isRequired,
  assertions: P.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
