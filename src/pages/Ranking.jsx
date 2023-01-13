import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clearPlayerInfos } from '../redux/action';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    const { dispatch } = this.props;
    return (
      <>
        <p data-testid="ranking-title">Ranking</p>
        <ol>
          {
            ranking.map((rank, index) => (
              <li key={ rank.name + index }>
                <img src={ rank.picture } alt={ rank.name } />
                <h4 data-testid={ `player-name-${index}` }>{rank.name}</h4>
                <p data-testid={ `player-score-${index}` }>{rank.score}</p>
              </li>
            ))
          }
        </ol>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => dispatch(clearPlayerInfos()) }
          >
            Início
          </button>
        </Link>
      </>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
