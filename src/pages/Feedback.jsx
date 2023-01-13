import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Feedback extends Component {
  render() {
    return (
      <>
        <p data-testid="feedback-text">Feedback</p>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}
