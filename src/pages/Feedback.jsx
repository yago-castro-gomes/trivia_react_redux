import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import P from 'prop-types';
import Header from '../components/Header';
import { clearPlayerInfos } from '../redux/action';

class Feedback extends Component {
  render() {
    const { dispatch, assertions, score } = this.props;
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
        <p>
          Sua pontuação foi:
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          Você acertou:
          <span data-testid="feedback-total-question">{ assertions }</span>
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
  score: P.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
