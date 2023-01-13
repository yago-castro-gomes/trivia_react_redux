import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import P from 'prop-types';
import Header from '../components/Header';

const THREE = 3;

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
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
          >
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: P.number.isRequired,
  score: P.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
